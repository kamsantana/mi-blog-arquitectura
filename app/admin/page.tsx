// app/admin/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('ARQUITECTURA')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)

    // Generamos el slug limpio a partir de tu título
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    try {
      // Realizamos la petición HTTP POST a la API local
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug, content, category }),
      })

      // DIAGNÓSTICO INTERACTIVO: Analizamos la respuesta del servidor
      if (res.ok) {
        alert('¡Éxito! Apunte guardado correctamente en Neon DB.')
        
        // Primero refrescamos para forzar la re-lectura de la base de datos en la main page
        await router.refresh()
        
        // Luego redirigimos al inicio de la bitácora
        router.push('/')
      } else {
        // Si el backend responde con un código de error (ej: 400 o 500)
        const errorData = await res.json().catch(() => ({}));
        alert(`Error del servidor: ${errorData.error || 'No se pudo registrar en la base de datos. Verifica tu backend.'}`)
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error(error)
      alert('Error de red: No se pudo establecer comunicación con el endpoint /api/posts')
      setIsSubmitting(false)
    }
  }

  // Función para cerrar sesión de administrador de forma manual
  const handleLogout = async () => {
    document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    router.refresh()
    router.push('/')
  }

  return (
    <main style={{ backgroundColor: '#0a0d14', minHeight: '100vh', color: '#fff', padding: '3rem 2rem', fontFamily: 'system-ui, sans-serif', position: 'relative' }}>
      
      {/* Botón de control de salida para el Admin */}
      <div style={{ maxWidth: '600px', margin: '0 auto 1.5rem auto', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          onClick={handleLogout}
          style={{ background: 'transparent', border: '1px solid #e53e3e', color: '#e53e3e', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          Cerrar Sesión Admin
        </button>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#111520', padding: '2rem', borderRadius: '12px', border: '1px solid #1a2236' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '2rem', fontWeight: 'bold' }}>Nueva Publicación</h1>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0aec0', fontSize: '0.9rem' }}>Título del Apunte</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', backgroundColor: '#1a202c', border: '1px solid #2d3748', color: '#fff', outline: 'none' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0aec0', fontSize: '0.9rem' }}>Asignatura / Categoría</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', backgroundColor: '#1a202c', border: '1px solid #2d3748', color: '#fff', cursor: 'pointer', outline: 'none' }}>
              <option value="ARQUITECTURA">ARQUITECTURA DE SOFTWARE</option>
              <option value="CALIDAD">CALIDAD DE SOFTWARE</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0aec0', fontSize: '0.9rem' }}>Contenido / Teoría</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} required rows={6} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', backgroundColor: '#1a202c', border: '1px solid #2d3748', color: '#fff', resize: 'vertical', outline: 'none' }} />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{ background: isSubmitting ? '#b85300' : '#ff6e00', color: 'white', padding: '0.75rem', borderRadius: '6px', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}
          >
            {isSubmitting ? 'Publicando...' : 'Publicar Apunte'}
          </button>
        </form>
      </div>
    </main>
  )
}