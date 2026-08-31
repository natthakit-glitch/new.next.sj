import Link from "next/link"; 
 
export default function Navbar() { 
  return ( 
    <nav> 
        <ul>   
        <li> 
            <Link href="/">หน้าแรก</Link> 
        </li> 
        <li> 
            <Link href="/courses">รายวิชา</Link> 
        </li> 
        <li> 
            <Link href="/about">เกี่ยวกับเรา</Link> 
        </li> 
        </ul> 
    </nav>
  ); 
} 