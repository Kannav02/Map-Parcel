import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { testConnection } from './db/connection.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Real Estate Zoning API',
    status: 'running',
    timestamp: new Date().toISOString()
  })
})

// API routes
import parcelsRouter from './routes/parcels.js'
import zoningRouter from './routes/zoning.js'

app.use('/api/parcels', parcelsRouter)
app.use('/api/zoning', zoningRouter)

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Health check: http://localhost:${PORT}`)
  console.log(`Parcels API: http://localhost:${PORT}/api/parcels`)
  
  // Test database connection
  await testConnection()
})

export default app