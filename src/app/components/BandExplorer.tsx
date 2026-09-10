"use client";

import { useState, type ChangeEvent } from "react";
import type { Band } from "@/types/band";
import BandCard from "@/components/BandCard";

type BandExplorerProps = {
  bands: Band[];
};

type SortOption = "none" | "name" | "year";

export default function BandExplorer({ bands }: BandExplorerProps) {
  // State ทั้งหมดของหน้านี้
  const [keyword, setKeyword] = useState("");
  const [followingIds, setFollowingIds] = useState<number[]>([]);
  const [likes, setLikes] = useState<Record<number, number>>({});
  const [sortBy, setSortBy] = useState<SortOption>("none");

  // ฟังก์ชัน handle ทั้งหมด
  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleToggleFollow(id: number) {
    setFollowingIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((followId) => followId !== id)
        : [...prevIds, id]
    );
  }

  function handleLike(id: number) {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: (prevLikes[id] ?? 0) + 1,
    }));
  }

  function handleSortChange(event: ChangeEvent<HTMLSelectElement>) {
    setSortBy(event.target.value as SortOption);
  }

  function handleClearFilters() {
    setKeyword("");
    setSortBy("none");
  }

  // ค่าที่คำนวณได้ (Derived State)
  const searchText = keyword.trim().toLowerCase();

  const filteredBands = bands.filter((band) =>
    band.name.toLowerCase().includes(searchText)
  );

  const visibleBands = [...filteredBands].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "year") return a.formedYear - b.formedYear;
    return 0;
  });

  return (
    <div>
      <div className="toolbar">
        <input
          type="search"
          aria-label="ค้นหาวงดนตรี"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวงดนตรี"
        />

        <select value={sortBy} onChange={handleSortChange} aria-label="เรียงลำดับ">
          <option value="none">ไม่เรียงลำดับ</option>
          <option value="name">เรียงตามชื่อวง</option>
          <option value="year">เรียงตามปีที่ก่อตั้ง</option>
        </select>

        <button type="button" onClick={handleClearFilters}>
          ล้างเงื่อนไขทั้งหมด
        </button>

        <span>กำลังติดตาม: {followingIds.length} วง</span>
      </div>

      {visibleBands.length === 0 ? (
        <p>ไม่พบวงดนตรีที่ตรงกับเงื่อนไข</p>
      ) : (
        <section className="band-grid">
          {visibleBands.map((band) => (
            <BandCard
              key={band.id}
              band={band}
              isFollowing={followingIds.includes(band.id)}
              onToggleFollow={handleToggleFollow}
              likeCount={likes[band.id] ?? 0}
              onLike={handleLike}
            />
          ))}
        </section>
      )}
    </div>
  );
}