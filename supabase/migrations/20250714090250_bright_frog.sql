/*
  # Create vendors table

  1. New Tables
    - `vendors`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `business_name` (text)
      - `business_description` (text)
      - `business_address` (text)
      - `phone_number` (text)
      - `business_registration_number` (text)
      - `tax_identification_number` (text)
      - `bank_account_name` (text)
      - `bank_account_number` (text)
      - `bank_name` (text)
      - `business_category` (text)
      - `years_in_operation` (integer)
      - `website_url` (text)
      - `approved` (boolean)
      - `approved_at` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `vendors` table
    - Add policies for vendor data access
*/

CREATE TABLE IF NOT EXISTS vendors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  business_name text NOT NULL,
  business_description text NOT NULL,
  business_address text NOT NULL,
  phone_number text NOT NULL,
  business_registration_number text,
  tax_identification_number text,
  bank_account_name text,
  bank_account_number text,
  bank_name text,
  business_category text,
  years_in_operation integer,
  website_url text,
  approved boolean DEFAULT false,
  approved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;

-- Vendors can read their own data
CREATE POLICY "Vendors can read own data"
  ON vendors
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Vendors can update their own data
CREATE POLICY "Vendors can update own data"
  ON vendors
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Vendors can insert their own data
CREATE POLICY "Vendors can insert own data"
  ON vendors
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Admins can read all vendor data
CREATE POLICY "Admins can read all vendor data"
  ON vendors
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Admins can update all vendor data
CREATE POLICY "Admins can update all vendor data"
  ON vendors
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );