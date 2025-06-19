/*
  # Create supplier requests and related tables

  1. New Tables
    - `supplier_requests`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `status` (text, default 'pending')
      - `location` (text)
      - `lead_time_preference` (text)
      - `platforms` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `request_items`
      - `id` (uuid, primary key)
      - `request_id` (uuid, references supplier_requests)
      - `product_name` (text)
      - `quantity` (text)
      - `unit` (text)
      - `target_price` (text)
      - `created_at` (timestamp)

    - `shortlisted_suppliers`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `supplier_name` (text)
      - `supplier_data` (jsonb)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Supplier Requests Table
CREATE TABLE IF NOT EXISTS supplier_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  status text DEFAULT 'pending',
  location text,
  lead_time_preference text,
  platforms text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE supplier_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own requests"
  ON supplier_requests
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Request Items Table
CREATE TABLE IF NOT EXISTS request_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid REFERENCES supplier_requests(id) ON DELETE CASCADE,
  product_name text NOT NULL,
  quantity text,
  unit text,
  target_price text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE request_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own request items"
  ON request_items
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM supplier_requests 
      WHERE supplier_requests.id = request_items.request_id 
      AND supplier_requests.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM supplier_requests 
      WHERE supplier_requests.id = request_items.request_id 
      AND supplier_requests.user_id = auth.uid()
    )
  );

-- Shortlisted Suppliers Table
CREATE TABLE IF NOT EXISTS shortlisted_suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  supplier_name text NOT NULL,
  supplier_data jsonb NOT NULL,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE shortlisted_suppliers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own shortlisted suppliers"
  ON shortlisted_suppliers
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_supplier_requests_updated_at
  BEFORE UPDATE ON supplier_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shortlisted_suppliers_updated_at
  BEFORE UPDATE ON shortlisted_suppliers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();