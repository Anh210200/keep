/*
  Warnings:

  - You are about to alter the column `start_date` on the `absents` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `end_date` on the `absents` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `start_date` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `morning_shift_start` on the `schedules` table. The data in that column could be lost. The data in that column will be cast from `Time(0)` to `DateTime`.
  - You are about to alter the column `morning_shift_end` on the `schedules` table. The data in that column could be lost. The data in that column will be cast from `Time(0)` to `DateTime`.
  - You are about to alter the column `afternoon_shift_start` on the `schedules` table. The data in that column could be lost. The data in that column will be cast from `Time(0)` to `DateTime`.
  - You are about to alter the column `afternoon_shift_end` on the `schedules` table. The data in that column could be lost. The data in that column will be cast from `Time(0)` to `DateTime`.
  - You are about to alter the column `date` on the `timekeepings` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `morning_shift_start` on the `timekeepings` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `morning_shift_end` on the `timekeepings` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `afternoon_shift_start` on the `timekeepings` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `afternoon_shift_end` on the `timekeepings` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `absents` MODIFY `start_date` DATETIME NOT NULL,
    MODIFY `end_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `employees` MODIFY `start_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `schedules` MODIFY `morning_shift_start` DATETIME NOT NULL,
    MODIFY `morning_shift_end` DATETIME NOT NULL,
    MODIFY `afternoon_shift_start` DATETIME NOT NULL,
    MODIFY `afternoon_shift_end` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `timekeepings` MODIFY `date` DATETIME NOT NULL,
    MODIFY `morning_shift_start` DATETIME NULL,
    MODIFY `morning_shift_end` DATETIME NULL,
    MODIFY `afternoon_shift_start` DATETIME NULL,
    MODIFY `afternoon_shift_end` DATETIME NULL;
