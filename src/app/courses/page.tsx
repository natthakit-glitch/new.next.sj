import CourseCard from "../components/CourseCard";
import { courses } from "@/data/coursedata";

export default function CoursesPage() {



  return (
    <main className="page">
      <h1>รายวิชาทั้งหมด</h1>
      <div className="courseGrid">
       {courses.map((course) => (
  <CourseCard key={course.id} course={course} />
  ))}
       
      </div>
    </main>
  );
}