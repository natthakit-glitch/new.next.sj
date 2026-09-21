"use client";

import { useState, type ChangeEvent } from "react";
import type { Game } from "@/types/game";
import GameCard from "@/components/GameCard";
import GameForm, { type GameDraft } from "@/components/GameForm";

type GameExplorerProps = {
  initialGames: Game[];
};

export default function GameExplorer({
  initialGames,
}: GameExplorerProps) {

  // เก็บรายการเกมทั้งหมดไว้ใน State
  const [games, setGames] = useState<Game[]>(initialGames);

  // เก็บคำที่ใช้ค้นหาเกม
  const [keyword, setKeyword] = useState("");

  // เก็บ ID ของเกมที่กำลังแก้ไข ถ้าไม่มีคือกำลังเพิ่มเกม
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleKeywordChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    // เปลี่ยนคำค้นหาตามที่ผู้ใช้พิมพ์
    setKeyword(event.target.value);
  }

  function handleCreate(draft: GameDraft) {
    // สร้างข้อมูลเกมใหม่ก่อนเพิ่มเข้าในรายการ
    const newGame: Game = {
      id: crypto.randomUUID(),
      name: draft.name.trim(),
      platform: draft.platform,
      hours: Number(draft.hours),
      status: draft.status as Game["status"],
    };

    // เพิ่มเกมใหม่ต่อจากรายการเดิม
    setGames((prev) => [...prev, newGame]);
  }

  function handleDelete(id: string) {
    // กรองเกมที่ต้องการลบออกจากรายการ
    setGames((prev) =>
      prev.filter((game) => game.id !== id),
    );

    // ถ้าลบเกมที่กำลังแก้ไขอยู่ ให้ยกเลิกการแก้ไข
    if (editingId === id) {
      setEditingId(null);
    }
  }

  function handleUpdate(id: string, draft: GameDraft) {
    // ใช้ map เพื่อแก้เฉพาะเกมที่มี ID ตรงกัน
    setGames((prev) =>
      prev.map((game) =>
        game.id === id
          ? {
              ...game,
              name: draft.name.trim(),
              platform: draft.platform,
              hours: Number(draft.hours),
              status: draft.status as Game["status"],
            }
          : game,
      ),
    );

    // แก้ไขเสร็จแล้วออกจากโหมดแก้ไข
    setEditingId(null);
  }

  function handleSave(draft: GameDraft) {
    // ถ้าไม่มี ID แสดงว่าเป็นการเพิ่มเกมใหม่
    if (editingId === null) {
      handleCreate(draft);
    } else {
      // ถ้ามี ID แสดงว่าเป็นการแก้ไขเกมเดิม
      handleUpdate(editingId, draft);
    }
  }

  // หาเกมที่กำลังแก้ไขเพื่อนำข้อมูลเดิมไปใส่ในฟอร์ม
  const editingGame = games.find(
    (game) => game.id === editingId,
  );

  // ทำให้คำค้นหาเป็นตัวพิมพ์เล็กเพื่อให้ค้นหาได้ง่ายขึ้น
  const searchText = keyword.trim().toLowerCase();

  // กรองเกมตามชื่อเกม แพลตฟอร์ม หรือสถานะ
  const visibleGames = games.filter(
    (game) =>
      game.name.toLowerCase().includes(searchText) ||
      game.platform.toLowerCase().includes(searchText) ||
      game.status.toLowerCase().includes(searchText),
  );

  return (
    <div className="game-explorer">
      <div className="game-search">
        <label htmlFor="game-search-input">
          ค้นหาเกม
        </label>

        <input
          id="game-search-input"
          type="search"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อเกม แพลตฟอร์ม หรือสถานะ"
        />
      </div>

      {/* ส่งข้อมูลเกมที่กำลังแก้ไขไปให้ฟอร์ม */}
      <GameForm
        key={editingId ?? "new"}
        initialGame={editingGame}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      {visibleGames.length === 0 ? (
        <div className="game-empty">
          <p>ไม่พบเกมที่ตรงกับเงื่อนไข</p>
        </div>
      ) : (
        <section className="game-grid">
          {visibleGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}

              // กดแก้ไขแล้วเก็บ ID ของเกมไว้
              onEdit={() => setEditingId(game.id)}

              // ส่ง ID ไปให้ฟังก์ชันลบเกม
              onDelete={() => handleDelete(game.id)}
            />
          ))}
        </section>
      )}
    </div>
  );
}