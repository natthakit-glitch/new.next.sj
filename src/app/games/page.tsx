import type { Metadata } from "next";
import GameExplorer from "@/components/GameExplorer";
import { games } from "@/data/gamedata";

export const metadata: Metadata = {
  title: "Game Backlog",
};

export default function GamesPage() {
  return (
    <main className="page">
      <h1>Game Backlog</h1>

      <p>
        รายการเกมที่ตั้งใจจะเล่น พร้อมสถานะและเวลาที่คาดว่าจะใช้
      </p>

      <GameExplorer initialGames={games} />
    </main>
  );
}