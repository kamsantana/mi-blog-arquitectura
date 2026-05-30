// app/page.tsx
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function HomePage() {
  // Buscamos todos los posts guardados en Neon ordenados por el más reciente
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main style={{ 
      backgroundColor: '#0a0d14', 
      minHeight: '100vh', 
      color: '#fff', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      paddingBottom: '4rem'
    }}>
      {/* Encabezado Principal */}
      <header style={{ 
        textAlign: 'center', 
        padding: '3rem 2rem 2rem 2rem',
        backgroundImage: 'linear-gradient(to bottom, rgba(255,110,0,0.05), transparent)'
      }}>
        <p style={{ color: '#ff6e00', fontSize: '0.85rem', letterSpacing: '2px', fontWeight: 'bold', margin: 0 }}>
          INSTITUTO SUPERIOR TECNOLÓGICO YAVIRAC
        </p>
        <p style={{ color: '#8a99ad', fontSize: '0.75rem', letterSpacing: '1px', margin: '0.3rem 0 1rem 0' }}>
          DESARROLLO DE SOFTWARE
        </p>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>
          BITÁCORA DE SOFTWARE
        </h1>
        <p style={{ color: '#4a5568', fontSize: '0.7rem', margin: '0.5rem 0 0 0' }}>ELABORADO POR BSNQ</p>
      </header>

      {/* Control de Administración Flotante/Superior */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'flex-end' }}>
        <Link href="/admin" style={{ 
          background: '#0070f3', 
          color: 'white', 
          padding: '0.5rem 1rem', 
          borderRadius: '6px', 
          textDecoration: 'none', 
          fontSize: '0.85rem',
          fontWeight: '600',
          transition: 'background 0.2s'
        }}>
          Nueva Publicación
        </Link>
      </div>

      {/* Barra de Navegación de Categorías (Pestañas) */}
      <nav style={{ 
        maxWidth: '900px', 
        margin: '1.5rem auto 3rem auto', 
        display: 'flex', 
        borderBottom: '1px solid #1a202c' 
      }}>
        <button style={{ 
          flex: 1, 
          background: 'none', 
          border: 'none', 
          borderBottom: '2px solid #ff6e00', 
          color: '#ff6e00', 
          padding: '1rem', 
          fontWeight: 'bold', 
          fontSize: '0.9rem',
          cursor: 'pointer'
        }}>
          ARQUITECTURA DE SOFTWARE
        </button>
        <button style={{ 
          flex: 1, 
          background: 'none', 
          border: 'none', 
          color: '#a0aec0', 
          padding: '1rem', 
          fontSize: '0.9rem',
          cursor: 'pointer'
        }}>
          CALIDAD DE SOFTWARE
        </button>
      </nav>

      {/* Sección del Timeline / Contenido */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#718096' }}>
            <p>Aún no hay apuntes publicados en esta categoría.</p>
            <p style={{ fontSize: '0.85rem' }}>¡Haz clic en "Nueva Publicación" para estrenar la línea de tiempo!</p>
          </div>
        ) : (
          <div style={{ position: 'relative' }}>
            {/* Línea vertical izquierda característica del Timeline */}
            <div style={{ 
              position: 'absolute', 
              left: '15px', 
              top: '10px', 
              bottom: '10px', 
              width: '1px', 
              backgroundColor: '#1a202c' 
            }} />

            {/* Mapeo de cada publicación */}
            {posts.map((post: any) => (
              <div key={post.id} style={{ 
                display: 'flex', 
                gap: '2rem', 
                marginBottom: '2rem', 
                position: 'relative' 
              }}>
                {/* Círculo indicador naranja sobre la línea */}
                <div style={{ 
                  width: '11px', 
                  height: '11px', 
                  borderRadius: '50%', 
                  backgroundColor: '#0a0d14', 
                  border: '2px solid #ff6e00', 
                  position: 'absolute', 
                  left: '10px', 
                  top: '26px',
                  zIndex: 2
                }} />

                {/* Tarjeta de Contenido */}
                <article style={{ 
                  marginLeft: '2.5rem',
                  flex: 1,
                  backgroundColor: '#111520', 
                  border: '1px solid #1a2236', 
                  borderRadius: '12px', 
                  padding: '1.5rem',
                  transition: 'transform 0.2s, border-color 0.2s',
                }}>
                  {/* Etiqueta de Categoría */}
                  <span style={{ 
                    backgroundColor: '#1a202c', 
                    color: '#a0aec0', 
                    fontSize: '0.7rem', 
                    padding: '0.2rem 0.6rem', 
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Teoría
                  </span>

                  {/* Título */}
                  <h2 style={{ fontSize: '1.4rem', margin: '0.8rem 0 0.4rem 0', fontWeight: '700', color: '#fff' }}>
                    {post.title}
                  </h2>

                  {/* Imagen del Post (si existe) */}
                  {post.imageUrl && (
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '6px', margin: '1rem 0' }} 
                    />
                  )}

                  {/* Cuerpo o extracto del contenido */}
                  <p style={{ color: '#718096', fontSize: '0.9rem', lineHeight: '1.5', margin: '0.5rem 0 1.5rem 0' }}>
                    {post.content}
                  </p>

                  {/* Pie de la tarjeta */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #1a2236', paddingTop: '1rem' }}>
                    <span style={{ color: '#4a5568', fontSize: '0.75rem' }}>
                      {new Date(post.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    
                    <Link href={`/blog/${post.slug}`} style={{ 
                      color: '#ff6e00', 
                      textDecoration: 'none', 
                      fontSize: '0.8rem', 
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem'
                    }}>
                      LEER APUNTE →
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}