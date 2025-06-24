-- AlterTable
ALTER TABLE `job_listings` MODIFY `work_mode` ENUM('Onsite', 'Remote', 'Hybrid', 'Unknown') NOT NULL DEFAULT 'Unknown';
