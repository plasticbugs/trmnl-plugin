import { supabase } from '../../../utils/supabase'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { code, installation_callback_url } = req.query

  if (!code || !installation_callback_url) {
    return res.status(400).json({ error: 'Missing required parameters' })
  }

  try {
    // Exchange the code for an access token
    const tokenResponse = await fetch('https://usetrmnl.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code,
        client_id: process.env.TRMNL_CLIENT_ID,
        client_secret: process.env.TRMNL_CLIENT_SECRET,
        grant_type: 'authorization_code'
      })
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to fetch access token')
    }

    const { access_token } = await tokenResponse.json()

    // Store the access token and installation details
    await supabase
      .from('plugin_installations')
      .insert({
        token: access_token,
        code: code, // Store the original code for reference
        installation_callback_url: installation_callback_url,
        status: 'pending'
      })

    // Redirect back to TRMNL
    return res.redirect(installation_callback_url)
  } catch (error) {
    console.error('Installation error:', error)
    return res.status(500).json({ error: 'Installation failed' })
  }
} 