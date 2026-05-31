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
      backgroundColor: '#0F172A', // Azul marino profundo de fondo
      minHeight: '100vh', 
      color: '#F8FAFC', 
      fontFamily: '"Outfit", sans-serif',
      position: 'relative',
      overflowX: 'hidden',
      padding: '20px'
    }}>
      
      {/* BARRA DE NAVEGACIÓN SUPERIOR PREMIUM */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(30, 41, 59, 0.5)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '12px 24px',
        marginBottom: '24px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
      }}>
        {/* LOGO E INSTITUCIÓN */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            backgroundColor: '#10B981', 
            width: '32px', 
            height: '32px', 
            borderRadius: '8px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#0F172A'
          }}>Y</div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.5px' }}>IST YAVIRAC</div>
            <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>DESARROLLO DE SOFTWARE</div>
          </div>
        </div>

        {/* MENÚ DE ACCIONES */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500, letterSpacing: '1px' }}>
            ELABORADO POR BSNQ
          </span>
          <Link href="/admin" style={{ 
            backgroundColor: 'transparent', 
            color: '#F43F5E', 
            border: '1px solid rgba(244, 63, 94, 0.3)',
            padding: '8px 16px', 
            borderRadius: '10px', 
            textDecoration: 'none', 
            fontSize: '12px', 
            fontWeight: '700',
            transition: '0.3s'
          }}>
            ⚙️ Panel Control
          </Link>
        </div>
      </div>

      {/* DISEÑO BENTO GRID ASIMÉTRICO (DOS COLUMNAS) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '24px', 
        boxSizing: 'border-box',
        alignItems: 'start'
      }}>
        
        {/* COLUMNA IZQUIERDA: CONTENEDOR DE LA BITÁCORA DINÁMICA */}
        <div style={{ 
          background: 'rgba(15, 23, 42, 0.6)', 
          border: '2px solid #10B981', // Borde característico Verde Esmeralda
          borderRadius: '24px', 
          padding: '30px',
          boxShadow: '0 20px 40px rgba(16, 185, 129, 0.05)',
          minHeight: '65vh'
        }}>
          {/* IDENTIFICADOR DE SECCIÓN */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px', color: '#FFF' }}>
              Bitácora de Publicaciones
            </h1>
            <span style={{ 
              backgroundColor: 'rgba(16, 185, 129, 0.1)', 
              color: '#10B981', 
              padding: '6px 12px', 
              borderRadius: '20px', 
              fontSize: '11px', 
              fontWeight: 700 
            }}>
              ● En Línea
            </span>
          </div>

          {/* COMPONENTE INTERACTIVO (Maneja el filtrado de Arquitectura/Calidad interno) */}
          <TabNavigator initialPosts={posts} />
        </div>

        {/* COLUMNA DERECHA: PANEL DE HISTORIAL E INFORMACIÓN INSTITUCIONAL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* TARJETA DE RESUMEN RÁPIDO */}
          <div style={{
            background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '20px',
            padding: '24px',
          }}>
            <h3 style={{ fontSize: '14px', color: '#EA580C', fontWeight: 700, margin: '0 0 16px 0', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Índice de Contenidos
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {posts.slice(0, 4).map((p) => (
                <div key={p.id} style={{ paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#F1F5F9' }}>{p.title}</div>
                  <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase' }}>{p.category.replace('_', ' ')}</div>
                </div>
              ))}
              {posts.length === 0 && (
                <div style={{ fontSize: '13px', color: '#64748B' }}>No hay registros guardados.</div>
              )}
            </div>
          </div>

          {/* TARJETA MARCA DE AGUA CORPORATIVA */}
          <div style={{
            background: 'rgba(30, 41, 59, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.03)',
            borderRadius: '20px',
            padding: '30px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              fontSize: '65px',
              fontWeight: 900,
              color: 'rgba(255, 255, 255, 0.01)',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none'
            }}>
              YAVIRAC
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', letterSpacing: '3px', marginBottom: '6px' }}>
                EDUCACIÓN SUPERIOR
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#EA580C', letterSpacing: '1px' }}>
                TECNOLÓGICO YAVIRAC
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  )
}