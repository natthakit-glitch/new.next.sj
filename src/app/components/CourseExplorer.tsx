"use client";

import { useState, type ChangeEvent } from "react";
import type { Course } from "@/types/course";
import CourseCard from "@/components/CourseCard";
import CourseForm, { type CourseDraft } from "@/components/CourseForm";

type CourseExplorerProps = {
  initialCourses: Course[];
};

export default function CourseExplorer({
  initialCourses,
}: CourseExplorerProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [keyword, setKeyword] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // ค้นหารายวิชา
  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  // เพิ่มรายวิชา
  function handleCreate(draft: CourseDraft) {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      code: draft.code.trim(),
      name: draft.name.trim(),
      credit: Number(draft.credit),
      instructor: draft.instructor.trim(),
    };

    setCourses((prev) => [...prev, newCourse]);
  }

  // ลบรายวิชา
  function handleDelete(id: string) {
    setCourses((prev) => prev.filter((course) => course.id !== id));

    if (editingId === id) {
      setEditingId(null);
    }
  }

  // แก้ไขรายวิชา
  function handleUpdate(id: string, draft: CourseDraft) {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id
          ? {
              ...course,
              code: draft.code.trim(),
              name: draft.name.trim(),
              credit: Number(draft.credit),
              instructor: draft.instructor.trim(),
            }
          : course,
      ),
    );

    setEditingId(null);
  }

  // บันทึกข้อมูล
  function handleSave(draft: CourseDraft) {
    if (editingId === null) {
      handleCreate(draft);
    } else {
      handleUpdate(editingId, draft);
    }
  }

  // หารายวิชาที่กำลังแก้ไข
  const editingCourse = courses.find(
    (course) => course.id === editingId,
  );

  // คำค้นหา
  const searchText = keyword.trim().toLowerCase();

  // กรองรายวิชา
  const visibleCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchText) ||
      course.code.toLowerCase().includes(searchText) ||
      course.instructor.toLowerCase().includes(searchText),
  );

  return (
    <div className="course-explorer">
      {/* ค้นหารายวิชา */}
      <div className="course-search">
        <label htmlFor="course-search">
          ค้นหารายวิชา
        </label>

        <input
          id="course-search"
          type="search"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา"
        />
      </div>

      {/* แบบฟอร์มเพิ่ม / แก้ไขรายวิชา */}
      <CourseForm
        key={editingId ?? "new"}
        initialCourse={editingCourse}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      {/* รายการรายวิชา */}
      {visibleCourses.length === 0 ? (
        <div className="empty-state">
          <p>ไม่พบรายวิชาที่ตรงกับเงื่อนไข</p>
        </div>
      ) : (
        <section className="courseGrid">
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={() => setEditingId(course.id)}
              onDelete={() => handleDelete(course.id)}
            />
          ))}
        </section>
      )}
    </div>
  );
}