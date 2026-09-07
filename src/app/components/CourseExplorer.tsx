"use client";

import { useState, type ChangeEvent } from "react";
import type { Course } from "@/types/course";
import CourseCard from "@/components/CourseCard";

type CourseExplorerProps = {
  courses: Course[];
};

export default function CourseExplorer({ courses }: CourseExplorerProps) {
  
  const [keyword, setKeyword] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [onlyFavorite, setOnlyFavorite] = useState(false);


  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleToggleFavorite(id: number) {
    setFavoriteIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((favoriteId) => favoriteId !== id)
        : [...prevIds, id]
    );
  }

  function handleToggleOnlyFavorite() {
    setOnlyFavorite((prev) => !prev);
  }

  const searchText = keyword.trim().toLowerCase();

  const visibleCourses = courses
    .filter(
      (course) =>
        course.title.toLowerCase().includes(searchText) ||
        course.code.includes(searchText)
    )
    .filter((course) => (onlyFavorite ? favoriteIds.includes(course.id) : true));

  return (
    
    <div>
      <div className="toolbar">
        <input
          type="search"
          aria-label="ค้นหารายวิชา"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา"
        />

        <button type="button" onClick={handleToggleOnlyFavorite}>
          {onlyFavorite ? "แสดงทั้งหมด" : "แสดงเฉพาะรายการโปรด"}
        </button>

        <span>รายการโปรด: {favoriteIds.length} รายวิชา</span>
      </div>

      {visibleCourses.length === 0 ? (
        <p>ไม่พบรายวิชาที่ตรงกับเงื่อนไข</p>
      ) : (
        <section className="courseGrid">
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isFavorite={favoriteIds.includes(course.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </section>
      )}
    </div>
  );
}