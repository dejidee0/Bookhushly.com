/*
  # Create payments table

  1. New Tables
    - `payments`
      - `id` (uuid, primary key)
      - `booking_id` (uuid, foreign key to bookings)
      - `customer_id` (uuid, foreign key to users)
      - `reference` (text, unique)
      - `amount` (decimal)
      - `provider` (text)
      - `status` (text)
      - `payment_data` (jsonb)
      - `verification_data` (jsonb)
      - `refund_amount` (decimal)
      - `refund_data` (jsonb)
      - `verified_at` (timestamp)
      - `refunded_at` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `payments` table
    - Add policies for payment access
*/

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
  customer_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  reference text UNIQUE NOT NULL,
  amount decimal(10,2) NOT NULL,
  provider text NOT NULL CHECK (provider IN ('paystack', 'flutterwave')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_data jsonb,
  verification_data jsonb,
  refund_amount decimal(10,2),
  refund_data jsonb,
  verified_at timestamptz,
  refunded_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Customers can read their own payments
CREATE POLICY "Customers can read own payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = customer_id);

-- System can insert payments
CREATE POLICY "System can insert payments"
  ON payments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = customer_id);

-- System can update payments
CREATE POLICY "System can update payments"
  ON payments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = customer_id);

-- Vendors can read payments for their bookings
CREATE POLICY "Vendors can read payments for their bookings"
  ON payments
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM bookings 
      JOIN listings ON listings.id = bookings.listing_id
      JOIN vendors ON vendors.id = listings.vendor_id
      WHERE bookings.id = payments.booking_id 
      AND vendors.user_id = auth.uid()
    )
  );

-- Admins can manage all payments
CREATE POLICY "Admins can manage all payments"
  ON payments
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );