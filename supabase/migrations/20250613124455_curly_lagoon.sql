/*
  # Fix profiles table foreign key constraint

  1. Changes
    - Drop the incorrect foreign key constraint that references `users(id)`
    - Add the correct foreign key constraint that references `auth.users(id)`
    - This ensures the profiles table properly links to Supabase's built-in auth system

  2. Security
    - No changes to existing RLS policies
    - Maintains all existing security constraints
*/

-- Drop the incorrect foreign key constraint
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Add the correct foreign key constraint referencing auth.users
ALTER TABLE profiles ADD CONSTRAINT profiles_id_fkey 
  FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;