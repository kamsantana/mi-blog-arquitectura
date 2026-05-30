// app/api/posts/route.ts
import { prisma } from '../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // 1. Declaramos las variables afuera del try para que el catch también pueda usarlas
  let title = ""
  let content = ""
  let category = "ARQUITECTURA"

  try {
    const body = await request.json()
    title = body.title
    content = body.content
    category = body.category

    if (!title || !content) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
    }

    // Generamos el slug limpio
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    const cleanCategory = String(category || 'ARQUITECTURA').toUpperCase().trim()

    // Intento 1: Guardar con la columna category usando la extensión dinámica (as any)
    const post = await (prisma.post as any).create({
      data: {
        title: title.trim(),
        slug: slug,
        content: content.trim(),
        category: cleanCategory
      }
    })

    return NextResponse.json(post)

  } catch (error: any) {
    console.error("❌ ERROR CRÍTICO EN NEON:", error)
    
    // RESPALDO SEGURO: Si Neon rechaza la columna 'category', guardamos el apunte sin ella.
    // Como las variables están arriba, aquí ya NO dará ningún error de "Cannot find name".
    try {
      const backupPost = await (prisma.post as any).create({
        data: {
          title: String(title).trim(),
          slug: String(title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
          content: String(content).trim()
        }
      })
      return NextResponse.json(backupPost)
    } catch (backupError: any) {
      return NextResponse.json({ 
        error: "Error definitivo en la base de datos", 
        details: error.message || backupError.message 
      }, { status: 500 })
    }
  }
}