-- CreateTable
CREATE TABLE "loggers" (
    "id" VARCHAR(255) NOT NULL,
    "date" DATE NOT NULL,
    "employee_id" INTEGER NOT NULL,

    CONSTRAINT "loggers_pkey" PRIMARY KEY ("id")
);
