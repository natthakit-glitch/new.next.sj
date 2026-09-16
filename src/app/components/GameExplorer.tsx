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
  const [games, setGames] = useState<Game[]>(initialGames);
  const [keyword, setKeyword] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleKeywordChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setKeyword(event.target.value);
  }

  function handleCreate(draft: GameDraft) {
    const newGame: Game = {
      id: crypto.randomUUID(),
      name: draft.name.trim(),
      platform: draft.platform,
      hours: Number(draft.hours),
      status: draft.status as Game["status"],
    };

    setGames((prev) => [...prev, newGame]);
  }

  function handleDelete(id: string) {
    setGames((prev) =>
      prev.filter((game) => game.id !== id),
    );

    if (editingId === id) {
      setEditingId(null);
    }
  }

  function handleUpdate(id: string, draft: GameDraft) {
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

    setEditingId(null);
  }

  function handleSave(draft: GameDraft) {
    if (editingId === null) {
      handleCreate(draft);
    } else {
      handleUpdate(editingId, draft);
    }
  }

  const editingGame = games.find(
    (game) => game.id === editingId,
  );

  const searchText = keyword.trim().toLowerCase();

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
              onEdit={() => setEditingId(game.id)}
              onDelete={() => handleDelete(game.id)}
            />
          ))}
        </section>
      )}
    </div>
  );
}