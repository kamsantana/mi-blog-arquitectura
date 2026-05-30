// app/page.tsx
import { prisma } from '../lib/prisma'
import Link from 'next/link'
import TabNavigator from './components/TabNavigator/TabNavigator'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // Traemos los posts de la base de datos
  const rawPosts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  })

  // 🛠️ MAPEAMOS LOS POSTS: Convertimos las fechas a texto para que TypeScript no chille
  const posts = rawPosts.map((post: any) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content,
    category: post.category || 'ARQUITECTURA',
    createdAt: post.createdAt ? new Date(post.createdAt).toISOString() : '',
  }))

  return (
    <main style={{ backgroundColor: '#0a0d14', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ textAlign: 'center', padding: '3rem 2rem 1rem 2rem' }}>
        <p style={{ color: '#ff6e00', fontSize: '0.85rem', letterSpacing: '2px', fontWeight: 'bold', margin: 0 }}>
          INSTITUTO SUPERIOR TECNOLÓGICO YAVIRAC
        </p>
        <p style={{ color: '#718096', fontSize: '0.75rem', marginTop: '0.2rem' }}>
          DESARROLLO DE SOFTWARE
        </p>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', margin: '1rem 0 0.5rem 0', letterSpacing: '-1px' }}>
          BITÁCORA DE SOFTWARE
        </h1>
        <p style={{ color: '#4a5568', fontSize: '0.8rem', margin: 0 }}>
          ELABORADO POR BSNQ
        </p>
      </header>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'flex-end' }}>
        <Link href="/admin" style={{ backgroundColor: '#ff6e00', color: '#fff', padding: '0.6rem 1.3rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>
          Nueva Publicación
        </Link>
      </div>

      <TabNavigator initialPosts={posts} />
    </main>
  )
}