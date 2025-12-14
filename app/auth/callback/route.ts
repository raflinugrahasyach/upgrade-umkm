import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server"; // Pastikan path ini benar sesuai file server.ts Anda

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // Kalau ada parameter 'next', kita pakai. Kalau tidak, default ke Dashboard.
  const next = searchParams.get("next") ?? "/member/dashboard";

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Login sukses, lempar ke dashboard
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Kalau gagal, lempar ke login dengan pesan error
  return NextResponse.redirect(`${origin}/login?error=auth_code_error`);
}