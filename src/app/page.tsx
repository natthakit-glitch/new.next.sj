export default function HomePage() {
  const siteName: string = "Student Course Hub";
  const description: string = "ศูนย์รวมข้อมูลรายวิชาสำหรับนักศึกษา";
  const courseCount: number = 4;
  const isOpen: boolean = true;
  const topics: string[] = ["HTML", "CSS", "TypeScript", "Next.js"];

  return (
    <main>
      <h1>{siteName}</h1>
      <p>{description}</p>
      <p>จำนวนรายวิชา: {courseCount}</p>
      <p>สถานะระบบ: {isOpen ? "เปิดใช้งาน" : "ปิดใช้งาน"}</p>

      <ul>
        {topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>

      
    </main>
  );
}