import type { Metadata } from "next";
import BandExplorer from "@/components/BandExplorer";
import { bands } from "@/data/banddata";

export const metadata: Metadata = {
  title: "วงดนตรีที่ชื่นชอบ",
};

export default function BandsPage() {
  return (
    <main className="wrap">
      <div className="page-header">
        <h1>วงดนตรีที่ชื่นชอบ</h1>
      </div>
      <BandExplorer bands={bands} />
    </main>
  );
}