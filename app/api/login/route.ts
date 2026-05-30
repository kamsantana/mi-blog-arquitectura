// app/api/login/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    // 🔐 TU CONTRASEÑA DE ADMINISTRADOR
    const CONTRASEÑA_ADMIN = "BSNQ2026" 

    if (password === CONTRASEÑA_ADMIN) {
      const response = NextResponse.json({ success: true })
      
      // Cookie que te recordará como administrador por 30 días
      response.cookies.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30, 
        path: '/',
      })

      return response
    }

    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}