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

  const access_token = authHeader.split(' ')[1];

  try {
    const { user } = req.body;

    if (!user || !user.uuid) {
      return res.status(400).json({ error: 'Invalid user data' });
    }

    // Store the user information and mark installation as complete
    const { error: upsertError } = await supabase
      .from('plugin_settings')
      .upsert({
        uuid: user.uuid,
        user_data: {
          name: user.name,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          locale: user.locale,
          time_zone: user.time_zone,
          time_zone_iana: user.time_zone_iana,
          utc_offset: user.utc_offset,
          plugin_setting_id: user.plugin_setting_id
        },
        status: 'active'
      });

    if (upsertError) throw upsertError;

    // Update the installation status
    await supabase
      .from('plugin_installations')
      .update({ status: 'completed' })
      .eq('token', access_token);

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Installation success webhook error:', error);
    return res.status(500).json({ error: 'Failed to process installation success' });
  }
} 