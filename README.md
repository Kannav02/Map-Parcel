# Real Estate Zoning Update Tool

Interactive map application for updating property zoning classifications with full audit trail.

## Quick Start

### Prerequisites

- **Bun** (for backend)
- **Node.js 18+** (for frontend)

### Run the System

1. **Start Backend** (Port 3001)

   ```bash
   cd backend
   bun install
   bun run dev
   ```

2. **Start Frontend** (Port 5173)

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Access Application**
   - Open: http://localhost:5173
   - Backend API: http://localhost:3001

## 🎯 How It Works

1. **Select Parcels**: Click on map parcels to select/deselect them (red border = selected)
2. **Choose Zoning**: Pick new zoning type from dropdown in sidebar
3. **Update**: Click "Update" to apply changes to selected parcels
4. **View Results**: Map colors update automatically to reflect new zoning

## 📋 Key Assumptions

- **Zoning Types**: System supports exactly 4 zoning classifications:

  - `Residential` (Green)
  - `Commercial` (Blue)
  - `Industrial` (Orange)
  - `Mixed-Use` (Purple)

- **Database**: Uses existing PostgreSQL table `real_estate_zoning` with parcel geometry data
- **Authentication**: No user authentication implemented (single-user system)
- **Validation**: Backend strictly validates zoning types - frontend must match exactly
- **Transactions**: All updates are atomic (all parcels updated or none)

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript, Leaflet Maps, Zustand (state), React Query (server side data)
- **Backend**: Bun + Express, Drizzle ORM, Zod validation
- **Database**: PostgreSQL and wkx for geometry data

---

