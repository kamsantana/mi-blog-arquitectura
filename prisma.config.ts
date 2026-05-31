import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL, // 👈 Prisma 7 lee la base de datos de Neon desde aquí
  },
});