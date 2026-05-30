// app/admin/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('ARQUITECTURA') // ⬅️ Estado inicial
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Creamos el slug automáticamente a partir del título
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    // Enviamos los datos a la API, incluyendo la categoría seleccionada
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, content, category }), // ⬅️ Enviamos la categoría
    })

    if (res.ok) {
      router.push('/')
      router.refresh() // Refresca la página principal para traer el nuevo apunte
    }
  }

  return (
    <main style={{ backgroundColor: '#0a0d14', minHeight: '100vh', color: '#fff', padding: '3rem 2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#111520', padding: '2rem', borderRadius: '12px', border: '1px solid #1a2236' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '2rem', fontWeight: 'bold' }}>Nueva Publicación</h1>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0aec0', fontSize: '0.9rem' }}>Título del Apunte</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', backgroundColor: '#1a202c', border: '1px solid #2d3748', color: '#fff' }} />
          </div>

          {/* ⬇️ ESTE ES EL SELECTOR QUE DEBES AGREGAR EXACTAMENTE ⬇️ */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0aec0', fontSize: '0.9rem' }}>Asignatura / Categoría</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', backgroundColor: '#1a202c', border: '1px solid #2d3748', color: '#fff', cursor: 'pointer' }}>
              <option value="ARQUITECTURA">ARQUITECTURA DE SOFTWARE</option>
              <option value="CALIDAD">CALIDAD DE SOFTWARE</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0aec0', fontSize: '0.9rem' }}>Contenido / Teoría</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} required rows={6} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', backgroundColor: '#1a202c', border: '1px solid #2d3748', color: '#fff', resize: 'vertical' }} />
          </div>

          <button type="submit" style={{ background: '#ff6e00', color: 'white', padding: '0.75rem', borderRadius: '6px', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
            Publicar Apunte
          </button>
        </form>
      </div>
    </main>
  )
}