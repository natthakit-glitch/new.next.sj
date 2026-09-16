import Link from "next/link";
import type { Game } from "@/types/game";

type GameCardProps = {
  game: Game;
  onEdit: () => void;
  onDelete: () => void;
};

export default function GameCard({
  game,
  onEdit,
  onDelete,
}: GameCardProps) {
  return (
    <article className="game-card">
      <div className="game-card-header">
        <span className="game-platform">
          {game.platform}
        </span>

        <span className="game-hours">
          {game.hours} ชั่วโมง
        </span>
      </div>

      <h2>
        <Link href={`/games/${game.id}`}>
          {game.name}
        </Link>
      </h2>

      <p>
        สถานะ: <strong>{game.status}</strong>
      </p>

      <div className="game-card-actions">
        <button
          type="button"
          className="game-edit-button"
          onClick={onEdit}
        >
          แก้ไข
        </button>

        <button
          type="button"
          className="game-delete-button"
          onClick={onDelete}
        >
          ลบ
        </button>
      </div>
    </article>
  );
}