import { supabase } from '../utils/supabase'

export function Auth() {
  const handleOAuthSignIn = async (provider) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`
        }
      })
      if (error) throw error
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <button onClick={() => handleOAuthSignIn('github')}>
        Sign in with GitHub
      </button>
      <button onClick={() => handleOAuthSignIn('google')}>
        Sign in with Google
      </button>
    </div>
  )
} 