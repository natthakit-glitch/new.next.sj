import BandCard from "../components/BandCard";
import { bands } from "@/data/banddata";

export default function BandsPage() {
  return (
    <main className="wrap">
      <div className="page-header">
        <h1>วงดนตรีที่ชื่นชอบ</h1>
      </div>
      <div className="band-grid">
        {bands.map((band) => (
          <BandCard key={band.id} band={band} />
        ))}
      </div>
    </main>
  );
}