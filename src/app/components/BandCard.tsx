import Image from "next/image";
import type { Band } from "@/types/band";

type BandCardProps = {
  band: Band;
};

export default function BandCard({ band }: BandCardProps) {
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
          {band.genre} · ก่อตั้งปี {band.formedYear}
        </p>

        <ul className="band-members">
          {band.members.map((member) => (
            <li key={member.name}>
              <span className="member-name">{member.name}</span>
              <span className="member-role">{member.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}