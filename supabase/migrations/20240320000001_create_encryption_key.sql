-- Create a table to store the encryption key
CREATE TABLE IF NOT EXISTS encryption_keys (
  id SERIAL PRIMARY KEY,
  key_value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert a default encryption key (you should replace this with a secure key)
INSERT INTO encryption_keys (key_value)
VALUES ('your-secure-encryption-key-here')
ON CONFLICT DO NOTHING;

-- Create a function to get the encryption key
CREATE OR REPLACE FUNCTION get_encryption_key()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_key TEXT;
BEGIN
  SELECT key_value INTO v_key
  FROM encryption_keys
  ORDER BY created_at DESC
  LIMIT 1;
  
  RETURN v_key;
END;
$$; 