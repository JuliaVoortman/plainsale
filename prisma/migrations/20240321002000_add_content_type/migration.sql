-- AlterTable
ALTER TABLE IF EXISTS "Resource" ADD COLUMN IF NOT EXISTS "contentType" TEXT;

-- Verify column exists and add if missing
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'Resource' 
        AND column_name = 'contentType'
    ) THEN
        ALTER TABLE "Resource" ADD COLUMN "contentType" TEXT;
    END IF;
END $$;