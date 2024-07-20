import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { error } from 'console'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const { data: userData, error: userError } = await supabase
    .from('users_view')
    .select('*')
    .eq('uuid', user?.id)

  if (request.nextUrl.pathname.startsWith('/account')) {
    if (userError) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (userData[0]?.staff_position.toLowerCase() !== 'chief') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return response
}
