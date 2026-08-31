type CourseCardProps = { 
  code: string; 
  title: string; 
  credits: number; 
  isOpen: boolean; 
}; 
 
type CourseCardProps = {
    course: Course;
};


export default function CourseCard({ 
  code, 
  title, 
  credits, 
  isOpen, 
}: CourseCardProps) { 

    
  return ( 
    <article className="course-card"> 
      <h2>{title}</h2> 
      <p>รหัสวิชา: {code}</p> 
      <p>{credits} หน่วยกิต</p> 
      <p>{isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}</p> 
    </article> 
  ); 
} 