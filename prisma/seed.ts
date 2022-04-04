import { PrismaClient } from "@prisma/client";
import { CreateCourse } from "../app/models/course.server";

const prisma = new PrismaClient();

const courses: CreateCourse[] = [
  {
    courseId: "25288",
    parRating: 962,
    ratingDiff: 12,
    name: "Flaktveit Frisbeegolf - 18 hull 2022",
    parScore: 58,
  },
  {
    courseId: "19843",
    parRating: 873,
    ratingDiff: 12,
    name: "Frekhaug | Badevika",
    parScore: 54,
  },
  {
    courseId: "26981",
    parRating: 886,
    ratingDiff: 14,
    name: "Lynghaugparken --> 16 hull fra og med 29. mars",
    parScore: 48,
  },
];

const rounds = ["2049101", "2055949"];

async function seed() {
  courses.forEach(async (course) => {
    await prisma.course.create({
      data: course,
    });
  });

  rounds.forEach(async (round) => {
    await prisma.round.create({ data: { metrixId: round } });
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
