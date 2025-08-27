import express from 'express'
import { db } from '../db/connection.js'
import { realEstateZoning } from '../db/schema.js'
import wkx from 'wkx'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    console.log('Fetching parcels from database...')
    
    // Get parcels from database
    const parcels = await db.select().from(realEstateZoning)
    
    console.log(`Found ${parcels.length} parcels`)
    
    // Convert WKB geometry to GeoJSON in place
    const parcelsWithGeoJSON = parcels.map(row => ({
      ...row,
      geom: row.geom ? wkx.Geometry.parse(Buffer.from(row.geom, 'hex')).toGeoJSON() : null
    }))
    
    res.json({ 
      success: true,
      count: parcelsWithGeoJSON.length,
      parcels: parcelsWithGeoJSON 
    })
    
  } catch (error) {
    console.error('Error fetching parcels:', error)
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch parcels', 
      message: error.message 
    })
  }
})

export default router