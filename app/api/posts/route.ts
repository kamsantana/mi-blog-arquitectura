// app/api/posts/route.ts
import { prisma } from '../../../lib/prisma' // Sube 3 niveles exactos hasta la raíz
import { NextResponse } from 'next/server'

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
    console.error("Error en base de datos:", error)
    return NextResponse.json({ error: "Error al crear la publicación" }, { status: 500 })
  }
}