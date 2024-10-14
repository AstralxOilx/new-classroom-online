/*
  Warnings:

  - Made the column `description` on table `ClassRoom` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Subject" AS ENUM ('ThaiLanguage', 'EnglishLanguage', 'ChineseLanguage', 'JapaneseLanguage', 'FrenchLanguage', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'EnglishLiterature', 'History', 'Geography', 'ComputerScience', 'Economics', 'BusinessStudies', 'Psychology', 'Sociology', 'Philosophy', 'ArtandDesign', 'Music', 'PhysicalEducation', 'PoliticalScience', 'EnvironmentalScience', 'Engineering', 'InformationTechnology', 'Other');

-- CreateEnum
CREATE TYPE "SubjectType" AS ENUM ('Linguistics', 'MathematicsAndScience', 'SocialSciences', 'ArtsAndDesign', 'OccupationalAndTechnologyStudies', 'HealthAndPhysicalEducation', 'BusinessAndEconomics', 'Other');

-- AlterTable
ALTER TABLE "ClassRoom" ADD COLUMN     "colors" TEXT NOT NULL DEFAULT 'bg-red-600',
ADD COLUMN     "subject" "Subject" NOT NULL DEFAULT 'Other',
ADD COLUMN     "subject_type" "SubjectType" NOT NULL DEFAULT 'Other',
ALTER COLUMN "description" SET NOT NULL;
