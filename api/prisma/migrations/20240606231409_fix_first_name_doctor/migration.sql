-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Doctor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "speciality" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "avaialability" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "attendances" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Doctor" ("address", "attendances", "avaialability", "bio", "city", "createdAt", "experience", "firstName", "id", "lastName", "picture", "price", "speciality", "state") SELECT "address", "attendances", "avaialability", "bio", "city", "createdAt", "experience", "firstName", "id", "lastName", "picture", "price", "speciality", "state" FROM "Doctor";
DROP TABLE "Doctor";
ALTER TABLE "new_Doctor" RENAME TO "Doctor";
CREATE UNIQUE INDEX "Doctor_firstName_key" ON "Doctor"("firstName");
PRAGMA foreign_key_check("Doctor");
PRAGMA foreign_keys=ON;
