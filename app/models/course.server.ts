import { Course } from "@prisma/client";

export type CreateCourse = Omit<Course, "id">;
