/*
  Warnings:

  - A unique constraint covering the columns `[libelle]` on the table `Domaine` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Avis_prestataireId_fkey` ON `avis`;

-- DropIndex
DROP INDEX `Mission_domaineId_fkey` ON `mission`;

-- DropIndex
DROP INDEX `Mission_userId_fkey` ON `mission`;

-- DropIndex
DROP INDEX `Note_prestataireId_fkey` ON `note`;

-- DropIndex
DROP INDEX `Service_domaineId_fkey` ON `service`;

-- DropIndex
DROP INDEX `Service_userId_fkey` ON `service`;

-- CreateIndex
CREATE UNIQUE INDEX `Domaine_libelle_key` ON `Domaine`(`libelle`);

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
ALTER TABLE `Avis` ADD CONSTRAINT `Avis_prestataireId_fkey` FOREIGN KEY (`prestataireId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OutilToUser` ADD FOREIGN KEY (`A`) REFERENCES `Outil`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OutilToUser` ADD FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MissionToOutil` ADD FOREIGN KEY (`A`) REFERENCES `Mission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MissionToOutil` ADD FOREIGN KEY (`B`) REFERENCES `Outil`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
