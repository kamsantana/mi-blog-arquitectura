// app/components/TabNavigator/TabNavigator.tsx
'use client'

import { useState, useEffect } from 'react'

interface Post {
  id: string
  title: string
  slug: string
  content: string
  category: string
  createdAt: string
}

interface TabNavigatorProps {
  initialPosts: Post[]
}

export default function TabNavigator({ initialPosts }: TabNavigatorProps) {
  const [activeTab, setActiveTab] = useState<'ARQUITECTURA' | 'CALIDAD'>('ARQUITECTURA')
  const [posts, setPosts] = useState<Post[]>(initialPosts)

  useEffect(() => {
    setPosts(initialPosts)
  }, [initialPosts])

  const filteredPosts = posts.filter(post => {
    const postCategory = String(post.category || '').toUpperCase().trim()
    return postCategory.includes(activeTab)
  })

  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      
      {/* SISTEMA DE PESTAÑAS GLASSMORPHISM */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.04)', background: 'rgba(0,0,0,0.3)', zIndex: 10 }}>
        <button
          onClick={() => setActiveTab('ARQUITECTURA')}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: activeTab === 'ARQUITECTURA' ? '#FF5500' : '#94A3B8',
            fontSize: '13px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            padding: '18px 20px',
            cursor: 'pointer',
            position: 'relative',
            outline: 'none',
            backgroundColor: activeTab === 'ARQUITECTURA' ? 'rgba(255,85,0,0.04)' : 'transparent',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          ⚙️ Arquitectura de Software
          {activeTab === 'ARQUITECTURA' && (
            <div style={{ position: 'absolute', bottom: '-1px', left: '50%', transform: 'translateX(-50%)', width: '100%', height: '3px', background: '#FF5500', borderRadius: '3px 3px 0 0', boxShadow: '0 -2px 10px rgba(255, 85, 0, 0.4)' }} />
          )}
        </button>
        
        <button
          onClick={() => setActiveTab('CALIDAD')}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: activeTab === 'CALIDAD' ? '#FF5500' : '#94A3B8',
            fontSize: '13px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            padding: '18px 20px',
            cursor: 'pointer',
            position: 'relative',
            outline: 'none',
            backgroundColor: activeTab === 'CALIDAD' ? 'rgba(255,85,0,0.04)' : 'transparent',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          🏆 Calidad de Software
          {activeTab === 'CALIDAD' && (
            <div style={{ position: 'absolute', bottom: '-1px', left: '50%', transform: 'translateX(-50%)', width: '100%', height: '3px', background: '#FF5500', borderRadius: '3px 3px 0 0', boxShadow: '0 -2px 10px rgba(255, 85, 0, 0.4)' }} />
          )}
        </button>
      </div>

      {/* CONTENEDOR TIMELINE DE PUBLICACIONES */}
      <div className="custom-scrollbar" style={{ overflowY: 'auto', padding: '30px 20px 80px', flexGrow: 1, scrollBehavior: 'smooth' }}>
        {filteredPosts.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#94A3B8', padding: '80px 20px', fontSize: '16px', fontWeight: '500', letterSpacing: '1px' }}>
            No hay apuntes publicados en esta asignatura todavía.
          </div>
        ) : (
          <div style={{ position: 'relative', margin: '0 auto', maxWidth: '800px', paddingLeft: '40px' }}>
            
            {/* Línea vertical de la línea de tiempo */}
            <div style={{ position: 'absolute', left: '15px', top: '15px', bottom: 0, width: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }} />
            
            {filteredPosts.map((post, index) => (
              <div 
                key={post.id} 
                style={{ 
                  position: 'relative', 
                  marginBottom: '35px', 
                  transition: 'transform 0.5s ease',
                  marginLeft: index % 2 === 0 ? '0px' : '15px' // Efecto levemente escalonado
                }}
              >
                {/* Viñeta brillante de la línea de tiempo */}
                <div style={{
                  content: '""', position: 'absolute', left: '-33px', top: '22px', width: '12px', height: '12px', borderRadius: '50%',
                  background: '#070B14', border: '2px solid #FF5500', boxShadow: '0 0 10px rgba(255, 85, 0, 0.4)', zIndex: 10
                }} />

                {/* Tarjeta Bento Premium */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '20px', padding: '20px 25px', boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                }}>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', padding: '4px 8px', borderRadius: '12px', letterSpacing: '1px', background: 'rgba(255,85,0,0.1)', color: '#FF5500', border: '1px solid rgba(255,85,0,0.3)', boxShadow: '0 0 10px rgba(255,85,0,0.2)' }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', padding: '4px 8px', borderRadius: '12px', letterSpacing: '1px', background: 'rgba(255,255,255,0.05)', color: '#94A3B8', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {post.createdAt ? post.createdAt.split('T')[0] : 'RECIENTE'}
                    </span>
                  </div>
                  
                  <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#FFF', margin: 0 }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: '15px', fontWeight: '400', color: '#94A3B8', marginTop: '10px', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                    {post.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}