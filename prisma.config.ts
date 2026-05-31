// prisma.config.ts
import { defineConfig } from '@prisma/config'

export default defineConfig({
  datasource: {
    // Aquí es donde Prisma 7 busca la URL de tu base de datos Neon en Vercel
    url: process.env.DATABASE_URL, 
  },
})