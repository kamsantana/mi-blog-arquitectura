// app/admin/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [loading, setLoading] = useState(false)
  const [authorized, setAuthorized] = useState(false)

  // Verificamos si iniciaste sesión antes de mostrar el formulario
  useEffect(() => {
    const isLogged = document.cookie.includes('admin_session=active')
    if (!isLogged) {
      window.location.href = '/login'
    } else {
      setAuthorized(true)
    }
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const category = formData.get('category') as string 

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

    // Envia el apunte incluyendo la categoría seleccionada (ARQUITECTURA o CALIDAD)
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, content, category }),
    })

    setLoading(false)
    window.location.href = '/'
  }

  if (!authorized) return <p style={{ color: '#fff', padding: '2rem' }}>Verificando credenciales...</p>

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', color: '#fff' }}>
      <Link href="/" style={{ color: '#ff6e00', textDecoration: 'none', fontWeight: 'bold' }}>← Volver al inicio público</Link>
      <h1 style={{ marginTop: '1.5rem', fontSize: '1.8rem' }}>Agregar nuevo apunte a la Bitácora</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '2rem' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontWeight: 'bold' }}>
          Título del Tema:
          <input name="title" type="text" required style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #222', background: '#111520', color: '#fff' }} />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontWeight: 'bold' }}>
          Asignatura / Destino:
          <select name="category" style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #222', background: '#111520', color: '#fff', cursor: 'pointer' }}>
            <option value="ARQUITECTURA">Arquitectura de Software</option>
            <option value="CALIDAD">Calidad de Software</option>
          </select>
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontWeight: 'bold' }}>
          Contenido del Apunte:
          <textarea name="content" required rows={8} style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #222', background: '#111520', color: '#fff', resize: 'vertical' }}></textarea>
        </label>

        <button type="submit" disabled={loading} style={{ background: '#ff6e00', color: '#fff', padding: '0.8rem', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          {loading ? 'Subiendo apunte...' : 'Publicar en la Bitácora'}
        </button>
      </form>
    </main>
  )
}