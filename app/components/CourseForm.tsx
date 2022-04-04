import { Course } from '@prisma/client';
import { Form, FormMethod } from 'remix';

type CourseFormProps = {
    course?: Course;
    method: FormMethod; 
}

export default function CoursesForm({ course, method }: CourseFormProps){
    return(
        <Form method={method}>
            <div style={{ display: 'none' }}>
                <input name="id" defaultValue={course?.id} />
            </div>
            <div>
                <label htmlFor='courseId'> CourseId </label>
                <input id="courseId" name="courseId" defaultValue={course?.courseId ?? ''}></input>
            </div>
            <div>
                <label htmlFor='courseName'> Course name </label>
                <input id="courseName" name="courseName" defaultValue={course?.name ?? ''}></input>
            </div>
            <div>
                <label htmlFor='parScore'> Par score </label>
                <input id="parScore" name="parScore" defaultValue={course?.parScore ?? ''}></input>
            </div>
            <div>
                <label htmlFor='parRating'> Par rating </label>
                <input id="parRating" name="parRating" defaultValue={course?.parRating ?? ''}></input>
            </div>
            <div>
                <label htmlFor='ratingDiff'> Rating diff </label>
                <input id="ratingDiff" name="ratingDiff" defaultValue={course?.ratingDiff ?? ''}></input>
            </div>
            <button type="submit"> {method === "post" ? "Add" : "Update"} </button>
        </Form>
    )
}