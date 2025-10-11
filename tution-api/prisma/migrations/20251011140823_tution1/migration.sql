-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "tution" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "isRegistered" BOOLEAN NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "schoolId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receipt" (
    "id" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "balance" TEXT NOT NULL,
    "payer" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "cleared" BOOLEAN NOT NULL,
    "student" TEXT NOT NULL,
    "class" TEXT NOT NULL,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnChainTxReceipts" (
    "id" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "gasUsed" TEXT,
    "to" TEXT,
    "from" TEXT,
    "time" TEXT,

    CONSTRAINT "OnChainTxReceipts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "School_schoolId_key" ON "School"("schoolId");
