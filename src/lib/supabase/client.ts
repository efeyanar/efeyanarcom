import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = import.meta.env.PUBLIC_SUPABASE_URL
  const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

  console.log('SUPABASE URL:', url)
  console.log('SUPABASE KEY:', key)

  return createBrowserClient(url!, key!)
}