"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Course } from "@/types/course";

export type CourseDraft = {
  code: string;
  name: string;
  credit: string;
  instructor: string;
};

type CourseFormProps = {
  initialCourse?: Course;
  onSave: (draft: CourseDraft) => void;
  onCancel: () => void;
};

const emptyDraft: CourseDraft = {
  code: "",
  name: "",
  credit: "",
  instructor: "",
};

function toDraft(course?: Course): CourseDraft {
  if (!course) {
    return emptyDraft;
  }

  return {
    code: course.code,
    name: course.name,
    credit: String(course.credit),
    instructor: course.instructor,
  };
}

export default function CourseForm({
  initialCourse,
  onSave,
  onCancel,
}: CourseFormProps) {
  const [draft, setDraft] = useState<CourseDraft>(toDraft(initialCourse));

  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;

    setDraft((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};

    if (!draft.code.trim()) {
      nextErrors.code = "กรุณากรอกรหัสวิชา";
    }

    if (!draft.name.trim()) {
      nextErrors.name = "กรุณากรอกชื่อรายวิชา";
    }

    const credit = Number(draft.credit);

    if (!draft.credit || !Number.isInteger(credit) || credit <= 0) {
      nextErrors.credit = "หน่วยกิตต้องเป็นจำนวนเต็มมากกว่า 0";
    }

    if (!draft.instructor.trim()) {
      nextErrors.instructor = "กรุณากรอกชื่ออาจารย์ผู้สอน";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }

  function handleCancel() {
    setDraft(emptyDraft);
    setErrors({});
    onCancel();
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="code">รหัสวิชา</label>
        <input
          id="code"
          name="code"
          type="text"
          value={draft.code}
          onChange={handleChange}
          aria-invalid={Boolean(errors.code)}
        />
        {errors.code && <p>{errors.code}</p>}
      </div>

      <div>
        <label htmlFor="name">ชื่อรายวิชา</label>
        <input
          id="name"
          name="name"
          type="text"
          value={draft.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="credit">หน่วยกิต</label>
        <input
          id="credit"
          name="credit"
          type="number"
          inputMode="numeric"
          value={draft.credit}
          onChange={handleChange}
          aria-invalid={Boolean(errors.credit)}
        />
        {errors.credit && <p>{errors.credit}</p>}
      </div>

      <div>
        <label htmlFor="instructor">อาจารย์ผู้สอน</label>
        <input
          id="instructor"
          name="instructor"
          type="text"
          value={draft.instructor}
          onChange={handleChange}
          aria-invalid={Boolean(errors.instructor)}
        />
        {errors.instructor && <p>{errors.instructor}</p>}
      </div>

      <button type="submit">
        {initialCourse ? "บันทึกการแก้ไข" : "เพิ่มรายวิชา"}
      </button>

      {initialCourse && (
        <button type="button" onClick={handleCancel}>
          ยกเลิก
        </button>
      )}
    </form>
  );
}