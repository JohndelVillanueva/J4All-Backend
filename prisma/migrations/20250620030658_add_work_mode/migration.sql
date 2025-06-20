-- AlterTable
ALTER TABLE `job_listings` ADD COLUMN `work_mode` ENUM('Onsite', 'Remote', 'Hybrid') NOT NULL DEFAULT 'Onsite';
