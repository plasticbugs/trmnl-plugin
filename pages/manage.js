import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';

export default function Manage() {
  const router = useRouter();
  const { uuid } = router.query;
  const [settings, setSettings] = useState({
    ssid: '',
    password: '',
    customMessage: 'Welcome to our WiFi! Scan the QR code to connect automatically.'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (uuid) {
      fetchSettings();
    }
  }, [uuid]);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('plugin_settings')
        .select('*')
        .eq('uuid', uuid)
        .single();

      if (error) throw error;

      if (data) {
        setSettings({
          ssid: data.wifi_credentials?.ssid || '',
          password: data.wifi_credentials?.password || '',
          customMessage: data.custom_message || 'Welcome to our WiFi! Scan the QR code to connect automatically.'
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      // Encrypt the password before storing
      const { data: encryptedData, error: encryptionError } = await supabase.rpc('encrypt_wifi_credentials', {
        p_ssid: settings.ssid,
        p_password: settings.password
      });

      if (encryptionError) throw encryptionError;

      const { error: updateError } = await supabase
        .from('plugin_settings')
        .upsert({
          uuid,
          wifi_credentials: encryptedData,
          custom_message: settings.customMessage,
          updated_at: new Date().toISOString()
        });

      if (updateError) throw updateError;

      setSuccess(true);
    } catch (error) {
      console.error('Error saving settings:', error);
      setError('Failed to save settings');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">WiFi Settings</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-md">
            Settings saved successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="ssid" className="block text-sm font-medium text-gray-700">
              WiFi Network Name (SSID)
            </label>
            <input
              type="text"
              id="ssid"
              value={settings.ssid}
              onChange={(e) => setSettings({ ...settings, ssid: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              WiFi Password
            </label>
            <input
              type="password"
              id="password"
              value={settings.password}
              onChange={(e) => setSettings({ ...settings, password: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="customMessage" className="block text-sm font-medium text-gray-700">
              Custom Message
            </label>
            <textarea
              id="customMessage"
              value={settings.customMessage}
              onChange={(e) => setSettings({ ...settings, customMessage: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 