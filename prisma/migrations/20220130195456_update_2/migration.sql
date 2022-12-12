/*
  Warnings:

  - You are about to drop the `_domainetoservice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_missiontoservice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `domaineId` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Avis_prestataireId_fkey` ON `avis`;

-- DropIndex
DROP INDEX `Mission_userId_fkey` ON `mission`;

-- DropIndex
DROP INDEX `Note_prestataireId_fkey` ON `note`;

-- AlterTable
ALTER TABLE `service` ADD COLUMN `domaineId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_domainetoservice`;

-- DropTable
DROP TABLE `_missiontoservice`;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_domaineId_fkey` FOREIGN KEY (`domaineId`) REFERENCES `Domaine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_prestataireId_fkey` FOREIGN KEY (`prestataireId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Avis` ADD CONSTRAINT `Avis_prestataireId_fkey` FOREIGN KEY (`prestataireId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ServiceToUser` ADD FOREIGN KEY (`A`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ServiceToUser` ADD FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OutilToUser` ADD FOREIGN KEY (`A`) REFERENCES `Outil`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OutilToUser` ADD FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MissionToOutil` ADD FOREIGN KEY (`A`) REFERENCES `Mission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MissionToOutil` ADD FOREIGN KEY (`B`) REFERENCES `Outil`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
