// app/page.tsx
import { prisma } from '../lib/prisma'
import Link from 'next/link'
import TabNavigator from './components/TabNavigator/TabNavigator'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  // Obtener los datos desde Neon DB
  const rawPosts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  })

  // 🛠️ MAPEADO ULTRA SEGURO: Evita que TypeScript se queje forzando el tipo como objeto flexible
  const posts = (rawPosts as any[]).map((post) => ({
    id: String(post.id),
    title: String(post.title || ''),
    slug: String(post.slug || ''),
    content: String(post.content || ''),
    category: String(post.category || 'ARQUITECTURA'),
    createdAt: post.createdAt ? new Date(post.createdAt).toISOString() : '',
  }))

  return (
    <div style={{ 
      backgroundColor: '#0F172A', 
      minHeight: '100vh', 
      width: '100%',
      padding: '24px',
      boxSizing: 'border-box'
    }}>
      
      {/* 1. BARRA DE NAVEGACIÓN SUPERIOR */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#1E293B',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        padding: '14px 24px',
        marginBottom: '24px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ 
            backgroundColor: '#10B981', 
            width: '36px', 
            height: '36px', 
            borderRadius: '8px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontWeight: 800,
            color: '#0F172A',
            fontSize: '16px'
          }}>
            Y
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.5px', color: '#FFFFFF' }}>
              IST YAVIRAC
            </span>
            <span style={{ fontSize: '10px', color: '#10B981', fontWeight: 700, letterSpacing: '0.5px' }}>
              DESARROLLO DE SOFTWARE
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600, letterSpacing: '1px' }}>
            ELABORADO POR BSNQ
          </span>
          <Link href="/admin" style={{ 
            color: '#F43F5E', 
            border: '1px solid rgba(244, 63, 94, 0.4)',
            padding: '8px 16px', 
            borderRadius: '8px', 
            textDecoration: 'none', 
            fontSize: '12px', 
            fontWeight: 700
          }}>
            ⚙️ Panel Control
          </Link>
        </div>
      </header>

      {/* 2. AREA DE CONTENIDO EN BENTO GRID */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2.2fr 1fr', 
        gap: '24px', 
        width: '100%',
        boxSizing: 'border-box',
        alignItems: 'start'
      }}>
        
        {/* PANEL PRINCIPAL IZQUIERDO */}
        <section style={{ 
          background: 'rgba(30, 41, 59, 0.3)', 
          border: '2px solid #10B981', 
          borderRadius: '20px', 
          padding: '28px',
          boxSizing: 'border-box'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '28px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            paddingBottom: '16px'
          }}>
            <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
              Bitácora de Publicaciones
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%' }}></span>
              <span style={{ color: '#10B981', fontSize: '11px', fontWeight: 700 }}>En Línea</span>
            </div>
          </div>

          <TabNavigator initialPosts={posts} />
        </section>

        {/* PANEL SECUNDARIO DERECHO */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px', boxSizing: 'border-box' }}>
          
          <div style={{
            background: '#1E293B',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '24px',
            boxSizing: 'border-box'
          }}>
            <h3 style={{ fontSize: '13px', color: '#EA580C', fontWeight: 700, margin: '0 0 16px 0', textTransform: 'uppercase' }}>
              Índice de Contenidos
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {posts.slice(0, 5).map((p) => (
                <div key={p.id} style={{ paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#E2E8F0', marginBottom: '4px' }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 700 }}>
                    {p.category.replace('_', ' ')}
                  </div>
                </div>
              ))}
              {posts.length === 0 && (
                <span style={{ fontSize: '13px', color: '#64748B' }}>Ninguna publicación registrada aún.</span>
              )}
            </div>
          </div>

          <div style={{
            background: 'rgba(30, 41, 59, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.02)',
            borderRadius: '16px',
            padding: '28px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}>
            <div style={{
              fontSize: '52px',
              fontWeight: 900,
              color: 'rgba(255, 255, 255, 0.01)',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              whiteSpace: 'nowrap'
            }}>
              YAVIRAC
            </div>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '10px', color: '#64748B', letterSpacing: '3px', marginBottom: '4px' }}>
                EDUCACIÓN SUPERIOR
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#EA580C' }}>
                TECNOLÓGICO YAVIRAC
              </div>
            </div>
          </div>

        </aside>

      </div>
    </div>
  )
}