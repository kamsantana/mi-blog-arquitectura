// app/page.tsx
import { prisma } from '../lib/prisma'
import Link from 'next/link'
import TabNavigator from './components/TabNavigator/TabNavigator'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const rawPosts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const posts = rawPosts.map((post: any) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content,
    category: post.category || 'ARQUITECTURA',
    createdAt: post.createdAt ? new Date(post.createdAt).toISOString() : '',
  }))

  return (
    <main style={{ 
      backgroundColor: '#070B14', 
      minHeight: '100vh', 
      color: '#F8FAFC', 
      fontFamily: '"Outfit", sans-serif',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      
      {/* CAPAS DE DISEÑO DE FONDO (AURORAS Y LUCES NEÓN) */}
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100vw', height: '100vw', background: 'radial-gradient(circle, rgba(255,85,0,0.06) 0%, transparent 60%)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', borderRadius: '50%', filter: 'blur(140px)', opacity: 0.12, zIndex: 0, pointerEvents: 'none', backgroundColor: '#FF5500', width: '40vw', height: '40vw', top: '-10vh', left: '-10vw' }} />
      <div style={{ position: 'fixed', borderRadius: '50%', filter: 'blur(140px)', opacity: 0.12, zIndex: 0, pointerEvents: 'none', backgroundColor: '#FF5500', width: '30vw', height: '30vw', bottom: '-10vh', right: '-10vw' }} />

      {/* INTERFAZ BENTO GRID */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', minHeight: '100vh', boxSizing: 'border-box', position: 'relative', zIndex: 1 }}>
        
        {/* PANEL PRINCIPAL CONTENEDOR */}
        <div style={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden', 
          background: 'rgba(16, 24, 43, 0.4)', 
          backdropFilter: 'blur(25px)', 
          WebkitBackdropFilter: 'blur(25px)',
          border: '1px solid rgba(255, 255, 255, 0.04)', 
          borderRadius: '20px', 
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6)' 
        }}>
          
          {/* ENCABEZADO CON MARCA DE AGUA */}
          <header style={{ 
            padding: '45px 40px', 
            textAlign: 'center', 
            position: 'relative', 
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            backgroundColor: '#070B14',
            overflow: 'hidden'
          }}>
            <h2 style={{ fontSize: '16px', letterSpacing: '5px', color: '#F8FAFC', textTransform: 'uppercase', margin: '0 0 8px 0', fontWeight: 700 }}>
              INSTITUTO SUPERIOR TECNOLÓGICO YAVIRAC
            </h2>
            <div style={{ fontSize: '13px', letterSpacing: '5px', color: '#FF5500', textTransform: 'uppercase', margin: '0 0 8px 0', fontWeight: 800, textShadow: '0 0 15px rgba(255, 85, 0, 0.4)' }}>
              DESARROLLO DE SOFTWARE
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 800, margin: 0, color: '#FFF', letterSpacing: '-0.5px' }}>
              BITÁCORA DE SOFTWARE
            </h1>
            <div style={{ display: 'inline-block', fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '8px', letterSpacing: '3px', textTransform: 'uppercase' }}>
              ELABORADO POR BSNQ
            </div>
          </header>

          {/* BOTÓN DE CREACIÓN FLOTANTE / ALINEADO */}
          <div style={{ padding: '20px 40px 0', display: 'flex', justifyContent: 'flex-end' }}>
            <Link href="/admin" style={{ 
              backgroundColor: '#FF5500', 
              color: '#000', 
              padding: '10px 20px', 
              borderRadius: '10px', 
              textDecoration: 'none', 
              fontSize: '13px', 
              fontWeight: '800',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              transition: '0.3s'
            }}>
              ⚙️ Nueva Publicación
            </Link>
          </div>

          {/* COMPONENTE DE NAVEGACIÓN (TIMELINE DINÁMICO) */}
          <TabNavigator initialPosts={posts} />
        </div>
      </div>
    </main>
  )
}