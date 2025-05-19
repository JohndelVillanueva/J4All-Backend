/*
  Warnings:

  - You are about to drop the column `createdAt` on the `verification_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `verification_tokens` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `verification_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `verification_tokens` DROP FOREIGN KEY `verification_tokens_userId_fkey`;

-- DropIndex
DROP INDEX `verification_tokens_userId_idx` ON `verification_tokens`;

-- AlterTable
ALTER TABLE `verification_tokens` DROP COLUMN `createdAt`,
    DROP COLUMN `userId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `verification_tokens_user_id_idx` ON `verification_tokens`(`user_id`);

-- AddForeignKey
ALTER TABLE `verification_tokens` ADD CONSTRAINT `verification_tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
