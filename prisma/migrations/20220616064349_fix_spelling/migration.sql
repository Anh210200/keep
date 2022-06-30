/*
  Warnings:

  - You are about to drop the column `empoyee_id` on the `timekeepings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,employee_id]` on the table `timekeepings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employee_id` to the `timekeepings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "timekeepings" DROP CONSTRAINT "timekeepings_empoyee_id_fkey";

-- DropIndex
DROP INDEX "timekeepings_id_empoyee_id_key";

-- AlterTable
ALTER TABLE "timekeepings" DROP COLUMN "empoyee_id",
ADD COLUMN     "employee_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "timekeepings_id_employee_id_key" ON "timekeepings"("id", "employee_id");

-- AddForeignKey
ALTER TABLE "timekeepings" ADD CONSTRAINT "timekeepings_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
