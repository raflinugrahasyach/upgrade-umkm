import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // 1. Siapkan Response Awal
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 2. Buat Client Supabase
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Update cookie di Request & Response sekaligus
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 3. Cek User Saat Ini (PENTING: Jangan cuma getUser, cek datanya)
  const { data: { user } } = await supabase.auth.getUser()

  // 4. ATURAN KEAMANAN (SECURITY RULES)
  const url = request.nextUrl.clone()
  
  // A. Jika user mengakses halaman Member/Dashboard TAPI belum login
  if (request.nextUrl.pathname.startsWith('/member') && !user) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // B. Jika user mengakses halaman Login/Register TAPI sudah login (Biar gak login dobel)
  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') && user) {
    url.pathname = '/member/dashboard'
    return NextResponse.redirect(url)
  }

  // 5. Kembalikan Response yang sudah update cookie
  return response
}