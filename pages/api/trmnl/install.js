import { supabase } from '../../../utils/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { token, installation_callback_url } = req.body

  if (!token || !installation_callback_url) {
    return res.status(400).json({ error: 'Missing required parameters' })
  }

  try {
    // Exchange the token for an access token
    const tokenResponse = await fetch('https://usetrmnl.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: token,
        client_id: process.env.TRMNL_CLIENT_ID,
        client_secret: process.env.TRMNL_CLIENT_SECRET,
        grant_type: 'authorization_code'
      })
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to fetch access token')
    }

    const { access_token } = await tokenResponse.json()

    // Store the access token temporarily until we receive the success webhook
    // We'll use this to verify the webhook request later
    await supabase
      .from('plugin_installations')
      .insert({
        token: access_token,
        status: 'pending'
      })

    // Redirect back to TRMNL
    return res.redirect(installation_callback_url)
  } catch (error) {
    console.error('Installation error:', error)
    return res.status(500).json({ error: 'Installation failed' })
  }
} 