/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Char(40)` to `Char(36)`.
  - You are about to alter the column `userTypeId` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Char(40)` to `Char(36)`.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userTypeId_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" SET DATA TYPE CHAR(36),
ALTER COLUMN "userTypeId" SET DATA TYPE CHAR(36),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "UserType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
