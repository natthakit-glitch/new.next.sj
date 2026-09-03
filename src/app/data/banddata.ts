import { Band } from "@/types/band";

export const bands: Band[] = [
  { 
    id: 1,
    name: "Silly Fools",
    genre: "Alternative Rock",
    formedYear: 1997,
    imageUrl: "/images/bands/sillyfools.jpg",
     bio: "Silly Fools เป็นวงดนตรีร็อกสัญชาติไทยที่ก่อตั้งขึ้นในปี พ.ศ. 2540 โดยมีสมาชิกหลักคือ ปฏิเวธ อุทัยเฉลิม (ร้องนำ), กมล สุโกศล (กีตาร์), และ ธนดล จ๋วงพานิช (กลอง) วงนี้เป็นที่รู้จักในวงการเพลงไทยด้วยเสียงดนตรีที่เป็นเอกลักษณ์และเนื้อเพลงที่สะท้อนความคิดและความรู้สึกของคนรุ่นใหม่",
    members: [
      { name: "โต (วีรณัฐ ทรัพย์สัณฐาน)", role: "ร้องนำ",photoUrl: "/images/bands/sillyfools-toh11.jpg" },
      { name: "ต้น (จักรินทร์ จูประเสริฐ)", role: "กีตาร์", photoUrl: "/images/bands/sillyfools-ton.jpg" },
      { name: "หรั่ง (เทวฤทธิ์ ศรีสุข)", role: "เบส", photoUrl: "/images/bands/sillyfools-rang.jpg" },
      { name: "ต่อ (ต่อตระกูล ใบเงิน)", role: "กลอง", photoUrl: "/images/bands/sillyfools-to.jpg" },
    ],
    },
     { 
    id: 2,
    name: "Safeplanet",
    genre: "Indie Pop/Dream Pop",
    formedYear: 2557,
    imageUrl: "/images/bands/Safeplanet.jpg",
     bio: "Safeplanet เป็นวงดนตรีอินดี้ป็อป/อินดี้ร็อก (Indie Pop/Dream Pop) สัญชาติไทยที่มีสุภาพและจังหวะดนตรีโดดเด่นเป็นเอกลักษณ์ด้วยซาวด์กีตาร์โปร่งใส กลิ่นอายมินิมอล และจังหวะ Percussion สไตล์เขตร้อน (Tropical)",
    members: [
      { name: "เอ (ฐิติภัทร อรรถจินดา)", role: "นักร้องนำ / กีตาร์", photoUrl: "/images/bands/safeplanet-ae.jpg" },
      { name: "ดอย (อภิวิชญ์)", role: "กลองชุด", photoUrl: "/images/bands/safeplanet-doi.jpg" },
      { name: "ยี่ (ชยปัญญ์)", role: "เบส.", photoUrl: "/images/bands/safeplanet-yi.jpg" },
    ],
    }, { 
    id: 3,
    name: "Television Off",
    genre: "Indie Rock / Post-Punk / Shoegaze",
    formedYear: 1997,
    imageUrl: "/images/bands/televisionoff.jpg",
     bio: "Television Off เป็นวงดนตรีอินดี้ร็อก / โพสต์พังก์ (Indie Rock / Post-Punk / Shoegaze) สัญชาติไทย สังกัดค่าย Smallroom โดดเด่นด้วยซาวด์กีตาร์ที่มีมิติ เสียงร้องนุ่มลึก และเนื้อเพลงที่ถ่ายทอดความรู้สึกเหงา เศร้า หรือความสัมพันธ์ที่ไม่ชัดเจนได้อย่างมีเสน่ห์",
    members: [
      { name: "เฟิร์ส  (ภวัต พันธ์วิจิตร)", role: "ร้องนำ", photoUrl: "/images/bands/televisionoff-first.jpg" },
      { name: "โชค  (ศุภโชค เชื้อประทุม)", role: "กีตาร์", photoUrl: "/images/bands/televisionoff-chok.jpg" },
      { name: "ลาภ  (ศุภลาภ ถิรพรประเสริฐ)", role: "กีตาร์", photoUrl: "/images/bands/televisionoff-lap.jpg" },
      { name: "โบ๊ท", role: "เบส", photoUrl: "/images/bands/televisionoff-boo.jpg" }, 
    ],
    },

];
