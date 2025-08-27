import { db } from '../db/connection.js'
import { sql } from 'drizzle-orm'
import dotenv from 'dotenv'

dotenv.config()

async function dropTables() {
  try {
    console.log('Dropping existing tables...')
    
    await db.execute(sql`DROP TABLE IF EXISTS zoning_audit_logs CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS real_estate_zoning CASCADE`)
    
    console.log('Tables dropped successfully')
    
  } catch (error) {
    console.error('Error dropping tables:', error)
  }
  process.exit(0)
}

dropTables()