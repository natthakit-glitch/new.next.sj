import CourseCard from "../../components/CourseCard";

import { Course } from "@/data/coursedata";

export default function CoursesPage() {



  return (
    <main className="page">
      <h1>รายวิชาทั้งหมด</h1>
      <div className="courseGrid">
        {courses.map((course) => (
          <article key={course.id} className="courseCard">
            <h2>{course.title}</h2>
            <p>รหัสวิชา: {course.code}</p>
            <p>{course.credits} หน่วยกิต</p>
            <p>{course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}</p>
          </article>
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </main>
  );
}