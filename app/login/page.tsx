// app/login/page.tsx
'use client'
import { useState } from 'react'

export default function LoginPage() {
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validamos la clave de forma ultra rápida
    if (password === 'Yavirac2026*') {
      // Guardamos un token de sesión en el navegador por seguridad básica
      document.cookie = "admin_session=active; path=/; max-age=86400"
      window.location.href = '/admin'
    } else {
      alert('Contraseña incorrecta. Solo BSNQ puede acceder.')
    }
  }

  return (
    <main style={{ backgroundColor: '#0a0d14', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontFamily: 'sans-serif' }}>
      <form onSubmit={handleLogin} style={{ background: '#111520', padding: '2.5rem', borderRadius: '12px', border: '1px solid #1a2236', display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%', maxWidth: '360px' }}>
        <h2 style={{ fontSize: '1.2rem', textAlign: 'center', margin: 0, color: '#ff6e00' }}>ACCESO EXCLUSIVO</h2>
        <p style={{ fontSize: '0.8rem', color: '#718096', textAlign: 'center', margin: 0 }}>Introduce la clave para publicar nuevos apuntes en la bitácora.</p>
        
        <input 
          type="password" 
          placeholder="Contraseña de Administrador" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          style={{ padding: '0.7rem', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px', fontSize: '0.9rem' }} 
        />
        
        <button type="submit" style={{ background: '#ff6e00', border: 'none', color: '#fff', padding: '0.7rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }}>
          Verificar e Ingresar
        </button>
      </form>
    </main>
  )
}