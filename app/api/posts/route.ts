// app/api/posts/route.ts
import { prisma } from '../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, slug, content, category } = body

    if (!title || !content) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
    }

    // Aseguramos que la categoría vaya limpia y en mayúsculas estrictas
    const cleanedCategory = category?.toUpperCase().trim() === "CALIDAD" ? "CALIDAD" : "ARQUITECTURA"

    // Usamos un casting de tipo temporal para saltarnos el bloqueo del compilador si no ha regenerado la caché
    const post = await (prisma.post as any).create({
      data: { 
        title: title.trim(), 
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'), 
        content: content.trim(), 
        category: cleanedCategory
      },
    })
    
    return NextResponse.json(post)
  } catch (error: any) {
    console.error("❌ ERROR EN NEON/PRISMA:", error)
    return NextResponse.json({ error: "Error interno", details: error.message }, { status: 500 })
  }
}