/*
  Warnings:

  - You are about to drop the `avis` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `avis` to the `Note` table without a default value. This is not possible if the table is not empty.

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
DROP INDEX `Service_domaineId_fkey` ON `service`;

-- DropIndex
DROP INDEX `Service_userId_fkey` ON `service`;

-- AlterTable
ALTER TABLE `note` ADD COLUMN `avis` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `avis`;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_domaineId_fkey` FOREIGN KEY (`domaineId`) REFERENCES `Domaine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_domaineId_fkey` FOREIGN KEY (`domaineId`) REFERENCES `Domaine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
