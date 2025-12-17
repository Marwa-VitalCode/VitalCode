/*
  Warnings:

  - The `allergies` column on the `MedicalProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MedicalProfile" DROP COLUMN "allergies",
ADD COLUMN     "allergies" TEXT[];
