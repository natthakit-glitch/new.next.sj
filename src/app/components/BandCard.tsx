import Image from "next/image";
import type { Band } from "@/types/band";

type BandCardProps = {
  band: Band;
  isFollowing: boolean;
  onToggleFollow: (id: number) => void;
  likeCount: number;
  onLike: (id: number) => void;
};

export default function BandCard({
  band,
  isFollowing,
  onToggleFollow,
  likeCount,
  onLike,
}: BandCardProps) {
  return (
    <article className="band-card">
      <div className="band-card-image">
        <Image
          src={band.imageUrl}
          alt={`วง ${band.name}`}
          fill
          sizes="(max-width: 640px) 100vw, 320px"
        />
      </div>

      <div className="band-card-body">
        <h2>{band.name}</h2>
        <p className="band-meta">
          {band.genre} · ก่อตั้งปี {band.formedYear} · {band.members.length} สมาชิก
        </p>
        <p className="band-bio">{band.bio}</p>

        <ul className="band-members">
          {band.members.map((member) => (
            <li key={member.name}>
              <div className="member-photo">
                <Image src={member.photoUrl} alt={member.name} fill sizes="40px" />
              </div>
              <span className="member-name">{member.name}</span>
              <span className="member-role">{member.role}</span>
            </li>
          ))}
        </ul>

        <div className="band-actions">
          <button
            type="button"
            aria-pressed={isFollowing}
            onClick={() => onToggleFollow(band.id)}
          >
            {isFollowing ? "กำลังติดตาม" : "ติดตาม"}
          </button>

          <button type="button" onClick={() => onLike(band.id)}>
             Like ({likeCount})
          </button>
        </div>
      </div>
    </article>
  );
}