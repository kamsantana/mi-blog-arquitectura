// prisma.config.ts
import { defineConfig } from '@prisma/config'

export default defineConfig({
  datasource: {
    // Busca la variable en el entorno de Vercel o en el archivo de desarrollo local
    url: process.env.DATABASE_URL || process.env.NEXT_PUBLIC_DATABASE_URL, 
  },
})