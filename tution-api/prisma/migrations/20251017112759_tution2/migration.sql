/*
  Warnings:

  - The primary key for the `OnChainTxReceipts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `OnChainTxReceipts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Receipt` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Receipt` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `School` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `School` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "OnChainTxReceipts" DROP CONSTRAINT "OnChainTxReceipts_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "OnChainTxReceipts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "School" DROP CONSTRAINT "School_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "tution" DROP NOT NULL,
ADD CONSTRAINT "School_pkey" PRIMARY KEY ("id");
