/*
  Warnings:

  - Made the column `work_mode` on table `job_listings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `job_listings` MODIFY `work_mode` ENUM('Onsite', 'Remote', 'Hybrid') NOT NULL DEFAULT 'Onsite';
