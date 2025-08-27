CREATE TABLE "real_estate_zoning" (
	"id" integer PRIMARY KEY NOT NULL,
	"geom" text,
	"current_zoning" varchar(100),
	"address" text,
	"owner" text,
	"parcel_number" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "zoning_audit_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"batch_id" uuid NOT NULL,
	"parcel_id" integer NOT NULL,
	"old_zoning" varchar(50),
	"new_zoning" varchar(50) NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_info" jsonb
);
--> statement-breakpoint
ALTER TABLE "zoning_audit_logs" ADD CONSTRAINT "zoning_audit_logs_parcel_id_real_estate_zoning_id_fk" FOREIGN KEY ("parcel_id") REFERENCES "public"."real_estate_zoning"("id") ON DELETE no action ON UPDATE no action;