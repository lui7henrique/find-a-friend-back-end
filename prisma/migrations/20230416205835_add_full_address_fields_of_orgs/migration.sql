/*
  Warnings:

  - Added the required column `city` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "State" AS ENUM ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO');

-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "state" "State" NOT NULL;
