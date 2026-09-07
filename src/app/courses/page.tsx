import CourseCard from "../components/CourseCard";
import { courses } from "@/data/coursedata";
use client";
import CounterDemo from "@/components/CounterDemo"; 
<CounterDemo /> 


export default function CoursesPage() {



  return (
    <main className="page">
      <h1>รายวิชาทั้งหมด</h1>
      <button type="button" onClick={() => console.log("clicked")}> 
        ปุ่มทดลอง 
      </button> 
      <div className="courseGrid">
       {courses.map((course) => (
  <CourseCard key={course.id} course={course} />
  ))}
       
      </div>
    </main>
  );
}