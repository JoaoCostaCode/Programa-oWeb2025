/*
  Warnings:

  - You are about to alter the column `major_id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(36)`.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_major_id_fkey`;

-- DropIndex
DROP INDEX `users_major_id_fkey` ON `users`;

-- AlterTable
ALTER TABLE `users` MODIFY `major_id` CHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_major_id_fkey` FOREIGN KEY (`major_id`) REFERENCES `majors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
