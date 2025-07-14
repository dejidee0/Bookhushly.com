/*
  # Create bookings table

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `listing_id` (uuid, foreign key to listings)
      - `customer_id` (uuid, foreign key to users)
      - `booking_date` (date)
      - `booking_time` (time)
      - `guests` (integer)
      - `duration` (text)
      - `special_requests` (text)
      - `contact_phone` (text)
      - `contact_email` (text)
      - `total_amount` (decimal)
      - `status` (text)
      - `payment_status` (text)
      - `payment_reference` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `bookings` table
    - Add policies for booking access
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  customer_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  booking_date date NOT NULL,
  booking_time time NOT NULL,
  guests integer NOT NULL DEFAULT 1,
  duration text,
  special_requests text,
  contact_phone text NOT NULL,
  contact_email text NOT NULL,
  total_amount decimal(10,2) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_reference text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Customers can read their own bookings
CREATE POLICY "Customers can read own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = customer_id);

-- Customers can insert their own bookings
CREATE POLICY "Customers can insert own bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = customer_id);

-- Customers can update their own bookings (limited)
CREATE POLICY "Customers can update own bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = customer_id);

-- Vendors can read bookings for their listings
CREATE POLICY "Vendors can read bookings for their listings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM listings 
      JOIN vendors ON vendors.id = listings.vendor_id
      WHERE listings.id = bookings.listing_id 
      AND vendors.user_id = auth.uid()
    )
  );

-- Vendors can update bookings for their listings
CREATE POLICY "Vendors can update bookings for their listings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM listings 
      JOIN vendors ON vendors.id = listings.vendor_id
      WHERE listings.id = bookings.listing_id 
      AND vendors.user_id = auth.uid()
    )
  );

-- Admins can read all bookings
CREATE POLICY "Admins can read all bookings"
  ON bookings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );