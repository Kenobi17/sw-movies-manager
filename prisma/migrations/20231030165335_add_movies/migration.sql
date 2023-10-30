-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "episodeId" INTEGER NOT NULL,
    "openingCrawl" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "producer" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edited" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Planet" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Planet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Starship" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Starship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Species" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieToPlanet" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MovieToStarship" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MovieToVehicle" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MovieToSpecies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterToMovie" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_episodeId_key" ON "Movie"("episodeId");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_url_key" ON "Movie"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Character_url_key" ON "Character"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Planet_url_key" ON "Planet"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Starship_url_key" ON "Starship"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_url_key" ON "Vehicle"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Species_url_key" ON "Species"("url");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToPlanet_AB_unique" ON "_MovieToPlanet"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToPlanet_B_index" ON "_MovieToPlanet"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToStarship_AB_unique" ON "_MovieToStarship"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToStarship_B_index" ON "_MovieToStarship"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToVehicle_AB_unique" ON "_MovieToVehicle"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToVehicle_B_index" ON "_MovieToVehicle"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToSpecies_AB_unique" ON "_MovieToSpecies"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToSpecies_B_index" ON "_MovieToSpecies"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToMovie_AB_unique" ON "_CharacterToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToMovie_B_index" ON "_CharacterToMovie"("B");

-- AddForeignKey
ALTER TABLE "_MovieToPlanet" ADD CONSTRAINT "_MovieToPlanet_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToPlanet" ADD CONSTRAINT "_MovieToPlanet_B_fkey" FOREIGN KEY ("B") REFERENCES "Planet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToStarship" ADD CONSTRAINT "_MovieToStarship_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToStarship" ADD CONSTRAINT "_MovieToStarship_B_fkey" FOREIGN KEY ("B") REFERENCES "Starship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToVehicle" ADD CONSTRAINT "_MovieToVehicle_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToVehicle" ADD CONSTRAINT "_MovieToVehicle_B_fkey" FOREIGN KEY ("B") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToSpecies" ADD CONSTRAINT "_MovieToSpecies_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToSpecies" ADD CONSTRAINT "_MovieToSpecies_B_fkey" FOREIGN KEY ("B") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToMovie" ADD CONSTRAINT "_CharacterToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToMovie" ADD CONSTRAINT "_CharacterToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
