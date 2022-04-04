/*
  Warnings:

  - Added the required column `parScore` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "courseId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parRating" INTEGER NOT NULL,
    "ratingDiff" INTEGER NOT NULL,
    "parScore" INTEGER NOT NULL
);
INSERT INTO "new_Course" ("courseId", "id", "name", "parRating", "ratingDiff") SELECT "courseId", "id", "name", "parRating", "ratingDiff" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
