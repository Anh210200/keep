-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` CHAR(64) NOT NULL,
    `password` CHAR(255) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` CHAR(8) NOT NULL,
    `name` VARCHAR(64) NOT NULL,
    `gender` ENUM('male', 'female', 'others') NOT NULL DEFAULT 'male',
    `phone_number` CHAR(10) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `avatar` BLOB NULL,
    `date_start` DATE NOT NULL,
    `user_id` INTEGER NULL,
    `schedule_id` INTEGER NULL,

    UNIQUE INDEX `employees_code_key`(`code`),
    UNIQUE INDEX `employees_phone_number_key`(`phone_number`),
    UNIQUE INDEX `employees_user_id_key`(`user_id`),
    UNIQUE INDEX `employees_schedule_id_key`(`schedule_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `morning_shift_start` TIME NOT NULL,
    `morning_shift_end` TIME NOT NULL,
    `afternoon_shift_start` TIME NOT NULL,
    `afternoon_shift_end` TIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `absents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `note` TEXT NULL,
    `reason` VARCHAR(16) NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 0,
    `employee_id` INTEGER NOT NULL,

    UNIQUE INDEX `absents_id_employee_id_key`(`id`, `employee_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `timekeepings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `morning_shift_start` TIMESTAMP NULL,
    `morning_shift_end` TIMESTAMP NULL,
    `afternoon_shift_start` TIMESTAMP NULL,
    `afternoon_shift_end` TIMESTAMP NULL,
    `status` TINYINT NOT NULL DEFAULT 0,
    `empoyee_id` INTEGER NOT NULL,

    UNIQUE INDEX `timekeepings_id_empoyee_id_key`(`id`, `empoyee_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_schedule_id_fkey` FOREIGN KEY (`schedule_id`) REFERENCES `schedules`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `absents` ADD CONSTRAINT `absents_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `timekeepings` ADD CONSTRAINT `timekeepings_empoyee_id_fkey` FOREIGN KEY (`empoyee_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
