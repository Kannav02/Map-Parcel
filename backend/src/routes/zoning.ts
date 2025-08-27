import express from "express";
import { db } from "../db/connection.js";
import { realEstateZoning, zoningAuditLogs } from "../db/schema.js";
import { eq, inArray } from "drizzle-orm";
import { z } from "zod";

const router = express.Router();

// Validation schema
const updateZoningSchema = z.object({
  parcelIds: z.array(z.number()).min(1),
  newZoning: z.enum(["Residential", "Commercial", "Industrial", "Mixed-Use"]),
  batchId: z.string().uuid(),
});

router.post("/update", async (req, res) => {
  try {
    console.log("Zoning update request:", req.body);

    // Validate input
    const { parcelIds, newZoning, batchId } = updateZoningSchema.parse(
      req.body
    );

    // Perform update in transaction
    const result = await db.transaction(async (trx) => {
      // 1. Get current zoning values before update
      const currentParcels = await trx
        .select({
          id: realEstateZoning.id,
          currentZoning: realEstateZoning.currentZoning,
        })
        .from(realEstateZoning)
        .where(inArray(realEstateZoning.id, parcelIds));

      console.log(`Found ${currentParcels.length} parcels to update`);

      if (currentParcels.length !== parcelIds.length) {
        throw new Error(
          `Only found ${currentParcels.length} of ${parcelIds.length} parcels`
        );
      }

      // 2. Update parcels
      const updatedParcels = await trx
        .update(realEstateZoning)
        .set({ currentZoning: newZoning })
        .where(inArray(realEstateZoning.id, parcelIds))
        .returning();

      console.log(`Updated ${updatedParcels.length} parcels`);

      // 3. Create audit log entries
      const auditEntries = currentParcels.map((parcel) => ({
        batchId,
        parcelId: parcel.id,
        oldZoning: parcel.currentZoning,
        newZoning: newZoning,
        userInfo: {
          ip: req.ip,
          userAgent: req.get("User-Agent"),
        },
      }));

      await trx.insert(zoningAuditLogs).values(auditEntries);

      console.log(`Created ${auditEntries.length} audit log entries`);

      return {
        updatedCount: updatedParcels.length,
        parcels: updatedParcels,
      };
    });

    res.json({
      success: true,
      updatedCount: result.updatedCount,
      batchId,
      message: `Updated ${result.updatedCount} parcels to ${newZoning}`,
    });
  } catch (error) {
    console.error("Error updating zoning:", error);

    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        error: "Invalid input data",
        message:
          error.issues?.map((e) => e.message).join(", ") || "Validation failed",
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to update zoning",
      message: error.message,
    });
  }
});
export default router;
