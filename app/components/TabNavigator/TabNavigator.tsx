// app/components/TabNavigator/TabNavigator.tsx
'use client'

import { useState, useEffect } from 'react'

// Definimos los tipos exactos esperando puros strings sencillos
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
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 2rem', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* PESTAÑAS */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid #1a2236', marginBottom: '2rem', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setActiveTab('ARQUITECTURA')}
          style={{
            background: 'none',
            border: 'none',
            color: activeTab === 'ARQUITECTURA' ? '#ff6e00' : '#4a5568',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            borderBottom: activeTab === 'ARQUITECTURA' ? '3px solid #ff6e00' : '3px solid transparent',
            marginBottom: '-0.7rem',
            transition: 'all 0.2s'
          }}
        >
          ⚙️ Arquitectura de Software
        </button>
        
        <button
          onClick={() => setActiveTab('CALIDAD')}
          style={{
            background: 'none',
            border: 'none',
            color: activeTab === 'CALIDAD' ? '#ff6e00' : '#4a5568',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            borderBottom: activeTab === 'CALIDAD' ? '3px solid #ff6e00' : '3px solid transparent',
            marginBottom: '-0.7rem',
            transition: 'all 0.2s'
          }}
        >
          🏆 Calidad de Software
        </button>
      </div>

      {/* TARJETAS */}
      {filteredPosts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#4a5568', backgroundColor: '#111520', borderRadius: '12px', border: '1px solid #1a2236' }}>
          <p style={{ margin: 0, fontSize: '1.1rem' }}>No hay apuntes publicados en esta asignatura todavía.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {filteredPosts.map((post) => (
            <article 
              key={post.id} 
              style={{
                backgroundColor: '#111520',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid #1a2236',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            >
              <span style={{ backgroundColor: '#ff6e0022', color: '#ff6e00', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                {String(post.category).toUpperCase()}
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '1rem', color: '#fff' }}>
                {post.title}
              </h2>
              <p style={{ color: '#a0aec0', lineHeight: '1.7', whiteSpace: 'pre-wrap', margin: 0, fontSize: '1rem' }}>
                {post.content}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}