import { Course } from '@prisma/client';
import { ActionFunction, LoaderFunction, useLoaderData } from 'remix';
import { getCourses } from '../../api/courses.server'
import CoursesForm from '../../components/CourseForm';
import { prisma } from '../../db.server';

export const loader: LoaderFunction = async () => {
    return await getCourses(); 
}

export const action: ActionFunction = async ({request}) => {
    const formData = await request.formData();
    const courseId = formData.get("courseId"); 
    const courseName = formData.get("courseName"); 
    const parRating = formData.get("parRating"); 
    const ratingDiff = formData.get("ratingDiff"); 
    const parScore = formData.get('parScore');
    const id = formData.get("id"); 

    if(typeof courseId === "string" && typeof courseName === "string" && typeof parRating === "string" && typeof ratingDiff === "string" && typeof parScore === 'string'){
        if(request.method === "POST"){
            await prisma.course.create({ data: { courseId, name: courseName, parRating: parseInt(parRating), ratingDiff: parseInt(ratingDiff), parScore: parseInt(parScore) } })
        }
        if(request.method === "PATCH" && typeof id === "string"){
            await prisma.course.update({where: { id }, data: { courseId, name: courseName, parRating: parseInt(parRating), ratingDiff: parseInt(ratingDiff), parScore: parseInt(parScore) }})
        }
    }

    return null; 
}

export default function Courses(){
    const courses = useLoaderData<Course[]>();

    return(
        <div>
            {courses.map((course) => 
                <CoursesForm key={course.id} course={course} method="patch" />
            )}
            <h2>Add new</h2>
            <CoursesForm method="post" />
        </div>
    )
}