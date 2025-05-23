/*
  Warnings:

  - Added the required column `contact_person` to the `employers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employers` ADD COLUMN `contact_person` VARCHAR(191) NOT NULL;
