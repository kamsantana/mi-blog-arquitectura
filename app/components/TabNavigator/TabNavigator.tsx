// components/TabNavigator.tsx
'use client'

import { useState } from 'react'

interface TabNavigatorProps {
  initialPosts: any[]
}

export default function TabNavigator({ initialPosts }: TabNavigatorProps) {
  // Estado para controlar qué pestaña está activa
  const [activeCategory, setActiveCategory] = useState<'ARQUITECTURA' | 'CALIDAD'>('ARQUITECTURA')

  // Filtramos los posts de Neon en tiempo real según la pestaña (Corregido con tipo any)
  const filteredPosts = initialPosts.filter((post: any) => {
    const postCategory = post.category?.toUpperCase() || 'ARQUITECTURA'
    return postCategory === activeCategory
  })

  return (
    <div>
      {/* Pestañas de Navegación Interactivas */}
      <nav style={{ maxWidth: '900px', margin: '1.5rem auto 3rem auto', display: 'flex', borderBottom: '1px solid #1a202c' }}>
        <button 
          onClick={() => setActiveCategory('ARQUITECTURA')}
          style={{ 
            flex: 1, background: 'none', border: 'none', 
            borderBottom: activeCategory === 'ARQUITECTURA' ? '2px solid #ff6e00' : '2px solid transparent', 
            color: activeCategory === 'ARQUITECTURA' ? '#ff6e00' : '#a0aec0', 
            padding: '1rem', fontWeight: activeCategory === 'ARQUITECTURA' ? 'bold' : 'normal', 
            fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s'
          }}
        >
          ARQUITECTURA DE SOFTWARE
        </button>
        <button 
          onClick={() => setActiveCategory('CALIDAD')}
          style={{ 
            flex: 1, background: 'none', border: 'none', 
            borderBottom: activeCategory === 'CALIDAD' ? '2px solid #ff6e00' : '2px solid transparent', 
            color: activeCategory === 'CALIDAD' ? '#ff6e00' : '#a0aec0', 
            padding: '1rem', fontWeight: activeCategory === 'CALIDAD' ? 'bold' : 'normal', 
            fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s'
          }}
        >
          CALIDAD DE SOFTWARE
        </button>
      </nav>

      {/* Línea de tiempo filtrada */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        {filteredPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#718096' }}>
            <p>Aún no hay apuntes publicados en esta categoría.</p>
            <p style={{ fontSize: '0.85rem' }}>Los nuevos apuntes se dibujarán aquí de forma automática.</p>
          </div>
        ) : (
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '15px', top: '10px', bottom: '10px', width: '1px', backgroundColor: '#1a202c' }} />
            
            {filteredPosts.map((post: any) => (
              <div key={post.id} style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', position: 'relative' }}>
                <div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#0a0d14', border: '2px solid #ff6e00', position: 'absolute', left: '10px', top: '26px', zIndex: 2 }} />

                <article style={{ marginLeft: '2.5rem', flex: 1, backgroundColor: '#111520', border: '1px solid #1a2236', borderRadius: '12px', padding: '1.5rem' }}>
                  <span style={{ backgroundColor: '#1a202c', color: '#a0aec0', fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '20px', fontWeight: 'bold' }}>
                    TEORÍA
                  </span>
                  <h2 style={{ fontSize: '1.4rem', margin: '0.8rem 0 0.4rem 0', fontWeight: '700', color: '#fff' }}>
                    {post.title}
                  </h2>
                  <p style={{ color: '#718096', fontSize: '0.9rem', lineHeight: '1.5', margin: '0.5rem 0 1.5rem 0' }}>
                    {post.content}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #1a2236', paddingTop: '1rem' }}>
                    <span style={{ color: '#4a5568', fontSize: '0.75rem' }}>
                      {new Date(post.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}