import { Course } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getCourses() {
  return prisma.course.findMany();
}

export async function getCourse(courseId: Course["courseId"]) {
  return prisma.course.findFirst({ where: { courseId } });
}
