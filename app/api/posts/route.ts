// app/api/posts/route.ts
import { prisma } from '../../../lib/prisma' // Sube dos niveles para buscar la carpeta lib en la raíz
import { NextResponse } from 'next/server'

// Guarda el apunte que viene desde el formulario administrador
export async function POST(request: Request) {
  try {
    const { title, slug, content, category } = await request.json()
    
    const post = await prisma.post.create({
      data: { 
        title, 
        slug, 
        content, 
        category: category || "ARQUITECTURA"
      },
    })
    
    return NextResponse.json(post)
  } catch (error) {
    console.error("Error en POST:", error)
    return NextResponse.json({ error: "Error al crear la publicación" }, { status: 500 })
  }
}