/*
  # Create listings table

  1. New Tables
    - `listings`
      - `id` (uuid, primary key)
      - `vendor_id` (uuid, foreign key to vendors)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `price` (decimal)
      - `location` (text)
      - `capacity` (integer)
      - `duration` (text)
      - `availability` (text)
      - `features` (text)
      - `requirements` (text)
      - `cancellation_policy` (text)
      - `media_urls` (text array)
      - `active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `listings` table
    - Add policies for listing access
*/

CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid REFERENCES vendors(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL CHECK (category IN ('hotels', 'food', 'events', 'logistics', 'security')),
  price decimal(10,2) NOT NULL,
  location text NOT NULL,
  capacity integer,
  duration text,
  availability text DEFAULT 'available' CHECK (availability IN ('available', 'busy', 'unavailable')),
  features text,
  requirements text,
  cancellation_policy text,
  media_urls text[] DEFAULT '{}',
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Anyone can read active listings from approved vendors
CREATE POLICY "Anyone can read active listings"
  ON listings
  FOR SELECT
  TO authenticated
  USING (
    active = true 
    AND EXISTS (
      SELECT 1 FROM vendors 
      WHERE vendors.id = listings.vendor_id 
      AND vendors.approved = true
    )
  );

-- Vendors can read their own listings
CREATE POLICY "Vendors can read own listings"
  ON listings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM vendors 
      WHERE vendors.id = listings.vendor_id 
      AND vendors.user_id = auth.uid()
    )
  );

-- Vendors can insert their own listings
CREATE POLICY "Vendors can insert own listings"
  ON listings
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM vendors 
      WHERE vendors.id = listings.vendor_id 
      AND vendors.user_id = auth.uid()
      AND vendors.approved = true
    )
  );

-- Vendors can update their own listings
CREATE POLICY "Vendors can update own listings"
  ON listings
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM vendors 
      WHERE vendors.id = listings.vendor_id 
      AND vendors.user_id = auth.uid()
    )
  );

-- Vendors can delete their own listings
CREATE POLICY "Vendors can delete own listings"
  ON listings
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM vendors 
      WHERE vendors.id = listings.vendor_id 
      AND vendors.user_id = auth.uid()
    )
  );

-- Admins can read all listings
CREATE POLICY "Admins can read all listings"
  ON listings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );