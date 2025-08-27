import { defineConfig } from 'drizzle-kit'
import dotenv from 'dotenv'

dotenv.config()

console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL)

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL+ '?sslmode=require',
  },

})