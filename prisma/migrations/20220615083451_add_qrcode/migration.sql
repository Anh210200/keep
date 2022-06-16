/*
  Warnings:

  - You are about to alter the column `morning_shift_start` on the `timekeepings` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `morning_shift_end` on the `timekeepings` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `afternoon_shift_start` on the `timekeepings` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `afternoon_shift_end` on the `timekeepings` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `schedules` MODIFY `morning_shift_start` TIME NOT NULL,
    MODIFY `morning_shift_end` TIME NOT NULL,
    MODIFY `afternoon_shift_start` TIME NOT NULL,
    MODIFY `afternoon_shift_end` TIME NOT NULL;

-- AlterTable
ALTER TABLE `timekeepings` MODIFY `morning_shift_start` TIMESTAMP NULL,
    MODIFY `morning_shift_end` TIMESTAMP NULL,
    MODIFY `afternoon_shift_start` TIMESTAMP NULL,
    MODIFY `afternoon_shift_end` TIMESTAMP NULL;

-- CreateTable
CREATE TABLE `qrcodes` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
