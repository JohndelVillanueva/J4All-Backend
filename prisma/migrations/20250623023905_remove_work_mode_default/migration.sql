/*
  Warnings:

  - The values [Onsite] on the enum `job_listings_work_mode` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `job_listings` MODIFY `work_mode` ENUM('On_site', 'Remote', 'Hybrid') NULL;
