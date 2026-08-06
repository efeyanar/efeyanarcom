import { defineMiddleware } from 'astro:middleware'
import { createServerClient, parseCookieHeader } from '@supabase/ssr'

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const supabase = createServerClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return parseCookieHeader(context.request.headers.get('Cookie') ?? '')
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              context.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    const adminEmail = import.meta.env.ADMIN_EMAIL || 'efe1yanar@gmail.com'
    
    if (!user || user.email?.toLowerCase() !== adminEmail.toLowerCase()) {
      return context.redirect('/admin/login')
    }
  }

  const response = await next()

  if (pathname.startsWith('/admin')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  }

  return response
})