// components/TabNavigator/TabNavigator.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface TabNavigatorProps {
  initialPosts: any[]
}

export default function TabNavigator({ initialPosts }: TabNavigatorProps) {
  // Estado para controlar qué pestaña está activa
  const [activeCategory, setActiveCategory] = useState<'ARQUITECTURA' | 'CALIDAD'>('ARQUITECTURA')

  // Filtramos los posts de Neon en tiempo real según la pestaña
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

      {/* Línea de tiempo filtrada con el nuevo diseño visual */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        {filteredPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#718096' }}>
            <p>Aún no hay apuntes publicados en esta categoría.</p>
            <p style={{ fontSize: '0.85rem' }}>Los nuevos apuntes se dibujarán aquí de forma automática.</p>
          </div>
        ) : (
          <div style={{ position: 'relative' }}>
            {/* Eje de la línea de tiempo vertical izquierda */}
            <div style={{ position: 'absolute', left: '15px', top: '10px', bottom: '10px', width: '1px', backgroundColor: '#1a2236' }} />
            
            {filteredPosts.map((post: any) => (
              <div key={post.id} style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', position: 'relative' }}>
                {/* Círculo naranja indicador en el eje */}
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#0a0d14', border: '2px solid #ff6e00', position: 'absolute', left: '10px', top: '35px', zIndex: 2 }} />

                {/* Estructura idéntica de la tarjeta del apunte */}
                <article style={{ marginLeft: '2.5rem', flex: 1, backgroundColor: '#111520', border: '1px solid #1a2236', borderRadius: '20px', padding: '1.8rem', position: 'relative' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    
                    {/* Etiqueta superior */}
                    <span style={{ alignSelf: 'flex-start', backgroundColor: '#1a202c', color: '#a0aec0', fontSize: '0.65rem', padding: '0.2rem 0.7rem', borderRadius: '20px', fontWeight: 'bold', letterSpacing: '1px' }}>
                      TEORÍA
                    </span>
                    
                    {/* Título */}
                    <h2 style={{ fontSize: '1.8rem', margin: '0.2rem 0 0 0', fontWeight: '800', color: '#fff' }}>
                      {post.title}
                    </h2>
                    
                    {/* Extracto o contenido */}
                    <p style={{ color: '#718096', fontSize: '0.95rem', lineHeight: '1.6', margin: '0.2rem 0 1rem 0' }}>
                      {post.content}
                    </p>
                    
                    {/* Sección inferior con fecha y botón de lectura */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                      <span style={{ color: '#4a5568', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        🕒 {new Date(post.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      
                      {/* Enlace dinámico simulando tu botón original */}
                      <Link href={`/posts/${post.slug || post.id}`} style={{ color: '#ff6e00', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                        LEER APUNTE →
                      </Link>
                    </div>

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