import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { courses } from "@/data/coursedata";

type CoursePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { id } = await params;

  const course = courses.find((item) => item.id === id);

  return {
    title: course ? course.name : "ไม่พบรายวิชา",
  };
}

export default async function CoursePage({
  params,
}: CoursePageProps) {
  const { id } = await params;

  const course = courses.find((item) => item.id === id);

  if (!course) {
    notFound();
  }

  return (
    <main className="page">
      <h1>{course.name}</h1>

      <p>รหัสวิชา: {course.code}</p>
      <p>{course.credit} หน่วยกิต</p>
      <p>ผู้สอน: {course.instructor}</p>
    </main>
  );
}