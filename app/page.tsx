// app/page.tsx
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function HomePage() {
  // Buscamos todos los posts guardados en Neon ordenados por el más reciente
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #333', paddingBottom: '1rem' }}>
        <h1>Arquitectura & Calidad de Software</h1>
        <Link href="/admin" style={{ background: '#0070f3', color: 'white', padding: '0.5rem 1rem', borderRadius: '5px', textDecoration: 'none' }}>
          Nueva Publicación
        </Link>
      </header>

      <section style={{ marginTop: '2rem' }}>
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
            <p>Aún no hay artículos publicados.</p>
            <p>¡Haz clic en "Nueva Publicación" arriba para estrenar tu blog!</p>
          </div>
        ) : (
          posts.map((post) => (
            <article key={post.id} style={{ marginBottom: '2.5rem', border: '1px solid #eaeaea', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              {post.imageUrl && (
                <img src={post.imageUrl} alt={post.title} style={{ width: '100%', maxHeight: '350px', objectFit: 'cover', borderRadius: '6px', marginBottom: '1rem' }} />
              )}
              <h2 style={{ margin: '0 0 0.5rem 0' }}>{post.title}</h2>
              <p style={{ color: '#666' }}>{post.content.substring(0, 150)}...</p>
              <span style={{ color: '#0070f3', fontWeight: 'bold' }}>Leer más →</span>
            </article>
          ))
        )}
      </section>
    </main>
  )
}