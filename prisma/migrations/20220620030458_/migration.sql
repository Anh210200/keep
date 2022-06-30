/*
  Warnings:

  - You are about to drop the column `employee_id` on the `loggers` table. All the data in the column will be lost.
  - Added the required column `contentLength` to the `loggers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ip` to the `loggers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalUrl` to the `loggers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusCode` to the `loggers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAgent` to the `loggers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "loggers" DROP COLUMN "employee_id",
ADD COLUMN     "contentLength" INTEGER NOT NULL,
ADD COLUMN     "ip" VARCHAR(255) NOT NULL,
ADD COLUMN     "originalUrl" TEXT NOT NULL,
ADD COLUMN     "statusCode" INTEGER NOT NULL,
ADD COLUMN     "userAgent" VARCHAR(255) NOT NULL;
