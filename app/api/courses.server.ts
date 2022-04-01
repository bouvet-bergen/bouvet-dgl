import { prisma } from "~/db.server";

export async function getCourses(){
    return prisma.course.findMany(); 
}