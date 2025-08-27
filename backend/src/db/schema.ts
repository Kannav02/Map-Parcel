import { pgTable, serial, varchar, text, timestamp, integer, uuid, jsonb, real } from 'drizzle-orm/pg-core'

// Parcel data table (will be seeded from remote DB)
export const realEstateZoning = pgTable('real_estate_zoning', {
  id: integer('id').primaryKey(), // Match remote ID
  geom: text('geom'), // PostGIS binary as text
  currentZoning: varchar('current_zoning', { length: 100 }), // zoning_typ from remote
  address: text('address'), // mailadd from remote
  owner: text('owner'),
  parcelNumber: varchar('parcel_number', { length: 50 }), // parcelnumb from remote
})

// Audit log table (new - tracks all zoning changes)
export const zoningAuditLogs = pgTable('zoning_audit_logs', {
  id: serial('id').primaryKey(),
  batchId: uuid('batch_id').notNull(),
  parcelId: integer('parcel_id').notNull().references(() => realEstateZoning.id),
  oldZoning: varchar('old_zoning', { length: 50 }),
  newZoning: varchar('new_zoning', { length: 50 }).notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  userInfo: jsonb('user_info'), // IP, user agent, etc.
})

// Type exports for TypeScript
export type Parcel = typeof realEstateZoning.$inferSelect
export type NewParcel = typeof realEstateZoning.$inferInsert
export type AuditLog = typeof zoningAuditLogs.$inferSelect
export type NewAuditLog = typeof zoningAuditLogs.$inferInsert