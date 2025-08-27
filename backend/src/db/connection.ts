import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema.js'

// Local database connection
const connectionString = process.env.DATABASE_URL!
const client = postgres(connectionString,{ 
  ssl: 'require',
  max: 1 
})
export const db = drizzle(client, { schema })

// Remote database connection (read-only for seeding)
const remoteConnectionString = process.env.REMOTE_DATABASE_URL!
export const remoteClient = postgres(remoteConnectionString)

// Test connection
export async function testConnection() {
  try {
    await client`SELECT 1`
    console.log('Local database connected')
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  }
}