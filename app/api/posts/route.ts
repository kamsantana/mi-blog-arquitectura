// app/api/posts/route.ts
import { prisma } from '../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, slug, content, category } = body

    // Validamos que los campos requeridos existan
    if (!title || !content) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
    }

    // Forzamos que la categoría sea estrictamente "ARQUITECTURA" o "CALIDAD"
    const cleanedCategory = category?.toUpperCase().trim() === "CALIDAD" ? "CALIDAD" : "ARQUITECTURA"

    const post = await prisma.post.create({
      data: { 
        title: title.trim(), 
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'), 
        content: content.trim(), 
        category: cleanedCategory
      },
    })
    
    return NextResponse.json(post)
  } catch (error: any) {
    console.error("❌ ERROR CRÍTICO EN NEON/PRISMA:", error)
    return NextResponse.json({ error: "Error interno", details: error.message }, { status: 500 })
  }
}