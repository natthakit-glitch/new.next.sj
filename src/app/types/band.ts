export type Member = {
  name: string;
  role: string;
};

export type Band = {
  id: number;
  name: string;
  genre: string;
  formedYear: number;
  imageUrl: string;
  members: Member[];   // array ของ Member 
};
