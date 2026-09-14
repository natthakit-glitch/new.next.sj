"use client";

import CourseForm from "@/components/CourseForm";

export default function Page() {
  return (
    <CourseForm
      onSave={(draft) => console.log("saved:", draft)}
      onCancel={() => console.log("cancelled")}
    />
  );
}