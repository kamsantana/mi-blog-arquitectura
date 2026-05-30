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

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    // Forzamos la creación usando un tipado dinámico absoluto
    const post = await (prisma.post as any).create({
      data: {
        title: title.trim(),
        slug: slug,
        content: content.trim(),
        // @ts-ignore
        category: category || "ARQUITECTURA"
      }
    })

    return NextResponse.json(post)
  } catch (error: any) {
    console.error("❌ ERROR DIRECTO EN NEON:", error)
    return NextResponse.json({ error: "Error en la base de datos", details: error.message }, { status: 500 })
  }
}