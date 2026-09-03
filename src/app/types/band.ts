export type Member = {
  name: string;
  role: string;
  photoUrl: string; 
};

export type Band = {
  id: number;
  name: string;
  genre: string;
  formedYear: number;
  imageUrl: string;
  bio: string;  
  members: Member[];   
};
