export interface User {
  id: number;
  phone: string;
  password: string;
  created_at: Date;
}

export interface Questionnaire {
  id: number;
  user_id: number;
  name: string;
  age: number;
  gender: string;
  city: string;
  bio?: string;
  interests?: string[];
  photos?: string;
  show_gender?: string;
  created_at: Date;
  updated_at: Date;
}