import { db, remoteClient } from '../db/connection.js'
import { realEstateZoning } from '../db/schema.js'
import dotenv from 'dotenv'

dotenv.config()

async function seedParcelData() {
  try {
    console.log('Fetching parcel data from remote database...')
    
    // Fetch parcel data from remote (limit for testing)
    const remoteData = await remoteClient`SELECT * FROM real_estate_zoning`
    
    console.log(`Found ${remoteData.length} parcels in remote database`)
    
    // Clear existing local data
    await db.delete(realEstateZoning)
    console.log('Cleared existing local parcel data')
    
    // Transform remote data to match local schema
    const transformedData = remoteData.map(row => ({
      id: row.id,
      geom: row.geom, // Store PostGIS binary as-is
      currentZoning: row.zoning_typ || 'Unknown',
      address: row.mailadd || '',
      owner: row.owner || '',
      parcelNumber: row.parcelnumb || '',
    }))
    
    // Insert in batches
    await db.insert(realEstateZoning).values(transformedData)
    
    console.log(`Successfully seeded ${transformedData.length} parcels into local database`)
    
  } catch (error) {
    console.error('Error fetching remote data:', error)
  } finally {
    await remoteClient.end()
    process.exit(0)
  }
}

// Run if called directly
seedParcelData()