/*
  Warnings:

  - You are about to drop the `DailyTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DailyTask" DROP CONSTRAINT "DailyTask_ideaId_fkey";

-- DropTable
DROP TABLE "DailyTask";

-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "ideaId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Idea"("id") ON DELETE CASCADE ON UPDATE CASCADE;
