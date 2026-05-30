// app/api/posts/route.ts
import { prisma } from '../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, content, category } = body

    if (!title || !content) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 })
    }

    const slug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

    // Inserción directa y limpia
    const post = await prisma.post.create({
      data: {
        title: title.trim(),
        slug: slug,
        content: content.trim(),
        category: category || "ARQUITECTURA"
      }
    })

    return NextResponse.json(post)
  } catch (error: any) {
    console.error("❌ ERROR DIRECTO EN NEON:", error)
    return NextResponse.json({ error: "Error en la base de datos", details: error.message }, { status: 500 })
  }
}