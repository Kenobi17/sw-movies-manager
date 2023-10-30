/*
  Warnings:

  - You are about to drop the `Character` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Planet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Species` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Starship` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vehicle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CharacterToMovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MovieToPlanet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MovieToSpecies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MovieToStarship` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MovieToVehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CharacterToMovie" DROP CONSTRAINT "_CharacterToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_CharacterToMovie" DROP CONSTRAINT "_CharacterToMovie_B_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToPlanet" DROP CONSTRAINT "_MovieToPlanet_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToPlanet" DROP CONSTRAINT "_MovieToPlanet_B_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToSpecies" DROP CONSTRAINT "_MovieToSpecies_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToSpecies" DROP CONSTRAINT "_MovieToSpecies_B_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToStarship" DROP CONSTRAINT "_MovieToStarship_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToStarship" DROP CONSTRAINT "_MovieToStarship_B_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToVehicle" DROP CONSTRAINT "_MovieToVehicle_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToVehicle" DROP CONSTRAINT "_MovieToVehicle_B_fkey";

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "characters" TEXT[],
ADD COLUMN     "planets" TEXT[],
ADD COLUMN     "species" TEXT[],
ADD COLUMN     "starships" TEXT[],
ADD COLUMN     "vehicles" TEXT[];

-- DropTable
DROP TABLE "Character";

-- DropTable
DROP TABLE "Planet";

-- DropTable
DROP TABLE "Species";

-- DropTable
DROP TABLE "Starship";

-- DropTable
DROP TABLE "Vehicle";

-- DropTable
DROP TABLE "_CharacterToMovie";

-- DropTable
DROP TABLE "_MovieToPlanet";

-- DropTable
DROP TABLE "_MovieToSpecies";

-- DropTable
DROP TABLE "_MovieToStarship";

-- DropTable
DROP TABLE "_MovieToVehicle";
