"use client";

import { useState, type ChangeEvent } from "react";
import type { Band } from "@/types/band";
import BandCard from "@/components/BandCard";

type BandExplorerProps = {
  bands: Band[];
};

export default function BandExplorer({ bands }: BandExplorerProps) {

  const [keyword, setKeyword] = useState("");
  const [followingIds, setFollowingIds] = useState<number[]>([]);
  const [likes, setLikes] = useState<Record<number, number>>({});

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

  
  const searchText = keyword.trim().toLowerCase();

  const visibleBands = bands.filter((band) =>
    band.name.toLowerCase().includes(searchText)
  );

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

        <span className="follow-count">กำลังติดตาม: {followingIds.length} วง</span>
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