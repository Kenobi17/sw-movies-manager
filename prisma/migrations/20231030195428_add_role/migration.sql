-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STANDARD', 'ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'STANDARD';
