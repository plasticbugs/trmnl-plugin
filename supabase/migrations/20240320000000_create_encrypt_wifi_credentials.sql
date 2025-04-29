-- Enable the pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create the encrypt_wifi_credentials function
CREATE OR REPLACE FUNCTION encrypt_wifi_credentials(
  p_ssid text,
  p_password text
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_encrypted_ssid text;
  v_encrypted_password text;
  v_encryption_key text;
BEGIN
  -- Get the encryption key
  SELECT get_encryption_key() INTO v_encryption_key;
  
  -- Encrypt the SSID and password using pgcrypto
  v_encrypted_ssid := encode(pgp_sym_encrypt(p_ssid, v_encryption_key), 'base64');
  v_encrypted_password := encode(pgp_sym_encrypt(p_password, v_encryption_key), 'base64');
  
  -- Return the encrypted data as JSON
  RETURN jsonb_build_object(
    'ssid', v_encrypted_ssid,
    'password', v_encrypted_password
  );
END;
$$;

-- Create a function to decrypt the credentials
CREATE OR REPLACE FUNCTION decrypt_wifi_credentials(
  p_encrypted_data jsonb
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_decrypted_ssid text;
  v_decrypted_password text;
  v_encryption_key text;
BEGIN
  -- Get the encryption key
  SELECT get_encryption_key() INTO v_encryption_key;
  
  -- Decrypt the SSID and password
  v_decrypted_ssid := pgp_sym_decrypt(decode(p_encrypted_data->>'ssid', 'base64'), v_encryption_key);
  v_decrypted_password := pgp_sym_decrypt(decode(p_encrypted_data->>'password', 'base64'), v_encryption_key);
  
  -- Return the decrypted data as JSON
  RETURN jsonb_build_object(
    'ssid', v_decrypted_ssid,
    'password', v_decrypted_password
  );
END;
$$; 