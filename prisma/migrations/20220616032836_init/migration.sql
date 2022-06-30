-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'others');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" CHAR(64) NOT NULL,
    "password" CHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "code" CHAR(8) NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT E'male',
    "phone_number" CHAR(10) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "avatar" BYTEA,
    "date_start" DATE NOT NULL,
    "user_id" INTEGER,
    "schedule_id" INTEGER,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedules" (
    "id" SERIAL NOT NULL,
    "morning_shift_start" TIME NOT NULL,
    "morning_shift_end" TIME NOT NULL,
    "afternoon_shift_start" TIME NOT NULL,
    "afternoon_shift_end" TIME NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "absents" (
    "id" SERIAL NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "note" TEXT,
    "reason" VARCHAR(16) NOT NULL,
    "status" SMALLINT NOT NULL DEFAULT 0,
    "employee_id" INTEGER NOT NULL,

    CONSTRAINT "absents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timekeepings" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "morning_shift_start" TIMESTAMP,
    "morning_shift_end" TIMESTAMP,
    "afternoon_shift_start" TIMESTAMP,
    "afternoon_shift_end" TIMESTAMP,
    "status" SMALLINT NOT NULL DEFAULT 0,
    "empoyee_id" INTEGER NOT NULL,

    CONSTRAINT "timekeepings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qrcodes" (
    "id" VARCHAR(255) NOT NULL,

    CONSTRAINT "qrcodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employees_code_key" ON "employees"("code");

-- CreateIndex
CREATE UNIQUE INDEX "employees_phone_number_key" ON "employees"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "employees_user_id_key" ON "employees"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "employees_schedule_id_key" ON "employees"("schedule_id");

-- CreateIndex
CREATE UNIQUE INDEX "absents_id_employee_id_key" ON "absents"("id", "employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "timekeepings_id_empoyee_id_key" ON "timekeepings"("id", "empoyee_id");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedules"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "absents" ADD CONSTRAINT "absents_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timekeepings" ADD CONSTRAINT "timekeepings_empoyee_id_fkey" FOREIGN KEY ("empoyee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
