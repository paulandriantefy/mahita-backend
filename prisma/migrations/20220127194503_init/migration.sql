-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NULL,
    `description` VARCHAR(191) NOT NULL,
    `tel` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `quartier` VARCHAR(191) NOT NULL,
    `ville` VARCHAR(191) NOT NULL,
    `photos` VARCHAR(191) NOT NULL,
    `valide` BOOLEAN NOT NULL DEFAULT false,
    `verifie` BOOLEAN NOT NULL DEFAULT false,
    `societe` BOOLEAN NOT NULL DEFAULT false,
    `prestataire` BOOLEAN NOT NULL DEFAULT false,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_tel_key`(`tel`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Domaine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceDomaine` (
    `serviceId` INTEGER NOT NULL,
    `domaineId` INTEGER NOT NULL,

    PRIMARY KEY (`serviceId`, `domaineId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserService` (
    `userId` INTEGER NOT NULL,
    `serviceId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `serviceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Outil` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `photos` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserOutil` (
    `userId` INTEGER NOT NULL,
    `outilId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `outilId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(191) NOT NULL,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `serviceId` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `Tarif` DOUBLE NULL,
    `quartier` VARCHAR(191) NOT NULL,
    `ville` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `tel` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MissionService` (
    `missionId` INTEGER NOT NULL,
    `serviceId` INTEGER NOT NULL,

    PRIMARY KEY (`missionId`, `serviceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MissionOutil` (
    `missionId` INTEGER NOT NULL,
    `outilId` INTEGER NOT NULL,

    PRIMARY KEY (`missionId`, `outilId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valeur` INTEGER NOT NULL,
    `prestataireId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Avis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `avis` VARCHAR(191) NOT NULL,
    `prestataireId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ServiceDomaine` ADD CONSTRAINT `ServiceDomaine_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceDomaine` ADD CONSTRAINT `ServiceDomaine_domaineId_fkey` FOREIGN KEY (`domaineId`) REFERENCES `Domaine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserService` ADD CONSTRAINT `UserService_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserService` ADD CONSTRAINT `UserService_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserOutil` ADD CONSTRAINT `UserOutil_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserOutil` ADD CONSTRAINT `UserOutil_outilId_fkey` FOREIGN KEY (`outilId`) REFERENCES `Outil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MissionService` ADD CONSTRAINT `MissionService_missionId_fkey` FOREIGN KEY (`missionId`) REFERENCES `Mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MissionService` ADD CONSTRAINT `MissionService_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MissionOutil` ADD CONSTRAINT `MissionOutil_missionId_fkey` FOREIGN KEY (`missionId`) REFERENCES `Mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MissionOutil` ADD CONSTRAINT `MissionOutil_outilId_fkey` FOREIGN KEY (`outilId`) REFERENCES `Outil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_prestataireId_fkey` FOREIGN KEY (`prestataireId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Avis` ADD CONSTRAINT `Avis_prestataireId_fkey` FOREIGN KEY (`prestataireId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
