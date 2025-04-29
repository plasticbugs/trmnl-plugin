import { supabase } from '../../../utils/supabase';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify the authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { user_uuid } = req.body;

    if (!user_uuid) {
      return res.status(400).json({ error: 'Missing user_uuid' });
    }

    // Delete all settings for this user
    const { error: deleteError } = await supabase
      .from('plugin_settings')
      .delete()
      .eq('uuid', user_uuid);

    if (deleteError) {
      console.error('Error deleting user data:', deleteError);
      throw deleteError;
    }

    // Log the uninstallation (optional, for debugging)
    console.log(`Plugin uninstalled for user: ${user_uuid}`);

    return res.status(200).json({ 
      success: true, 
      message: 'User data successfully removed' 
    });

  } catch (error) {
    console.error('Uninstallation webhook error:', error);
    return res.status(500).json({ 
      error: 'Failed to process uninstallation' 
    });
  }
} 