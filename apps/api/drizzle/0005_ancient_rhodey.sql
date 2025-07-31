CREATE TYPE "public"."account_plan" AS ENUM('FREE', 'PRO', 'BUSINESS');--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "plan" "account_plan" DEFAULT 'FREE';