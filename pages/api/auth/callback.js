import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const code = req.query.code;

  if (code) {
    const supabase = createServerSupabaseClient({ req, res });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect back to the origin
  res.redirect('/');
} 