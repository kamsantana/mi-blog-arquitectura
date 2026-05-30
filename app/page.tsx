// app/page.tsx
import { prisma } from '../lib/prisma' // Sube un nivel para buscar la carpeta lib en la raíz
import Link from 'next/link'
import TabNavigator from './components/TabNavigator/TabNavigator' // Ruta exacta corregida (un solo punto)

export default async function HomePage() {
  // Solicitamos los apuntes guardados en la base de datos de Neon
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main style={{ backgroundColor: '#0a0d14', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', paddingBottom: '4rem' }}>
      <header style={{ textAlign: 'center', padding: '3rem 2rem 2rem 2rem' }}>
        <p style={{ color: '#ff6e00', fontSize: '0.85rem', letterSpacing: '2px', fontWeight: 'bold', margin: 0 }}>
          INSTITUTO SUPERIOR TECNOLÓGICO YAVIRAC
        </p>
        <p style={{ color: '#8a99ad', fontSize: '0.75rem', letterSpacing: '1px', margin: '0.3rem 0 1rem 0' }}>
          DESARROLLO DE SOFTWARE
        </p>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0 }}>BITÁCORA DE SOFTWARE</h1>
        <p style={{ color: '#4a5568', fontSize: '0.7rem', margin: '0.5rem 0 0 0' }}>ELABORADO POR BSNQ</p>
      </header>

      {/* Botón para navegar a la sección de administración */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'flex-end' }}>
        <Link href="/admin" style={{ background: '#ff6e00', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 'bold' }}>
          Nueva Publicación
        </Link>
      </div>

      {/* Enviamos los datos dinámicos al componente interactivo para las pestañas */}
      <TabNavigator initialPosts={posts} />
    </main>
  )
}