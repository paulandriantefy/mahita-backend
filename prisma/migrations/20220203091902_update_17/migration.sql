/*
  Warnings:

  - You are about to drop the column `outilId` on the `photo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nom]` on the table `Outil` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `titre` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `photo` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Mission_domaineId_fkey` ON `mission`;

-- DropIndex
DROP INDEX `Mission_userId_fkey` ON `mission`;

-- DropIndex
DROP INDEX `Note_prestataireId_fkey` ON `note`;

-- DropIndex
DROP INDEX `Note_userId_fkey` ON `note`;

-- DropIndex
DROP INDEX `Photo_outilId_fkey` ON `photo`;

-- DropIndex
DROP INDEX `Photo_userId_fkey` ON `photo`;

-- DropIndex
DROP INDEX `Service_domaineId_fkey` ON `service`;

-- DropIndex
DROP INDEX `Service_userId_fkey` ON `service`;

-- AlterTable
ALTER TABLE `photo` DROP COLUMN `outilId`,
    ADD COLUMN `titre` VARCHAR(191) NOT NULL,
    MODIFY `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Outil_nom_key` ON `Outil`(`nom`);

-- AddForeignKey
ALTER TABLE `Photo` ADD CONSTRAINT `Photo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_domaineId_fkey` FOREIGN KEY (`domaineId`) REFERENCES `Domaine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_domaineId_fkey` FOREIGN KEY (`domaineId`) REFERENCES `Domaine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_prestataireId_fkey` FOREIGN KEY (`prestataireId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OutilToUser` ADD FOREIGN KEY (`A`) REFERENCES `Outil`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OutilToUser` ADD FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MissionToOutil` ADD FOREIGN KEY (`A`) REFERENCES `Mission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MissionToOutil` ADD FOREIGN KEY (`B`) REFERENCES `Outil`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
