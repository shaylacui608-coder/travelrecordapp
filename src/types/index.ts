export type Partner = 'just me' | 'my mom' | 'friends' | 'colleague' | 'other';

export type ExpenseCategory =
  | 'flight'
  | 'food'
  | 'hotel'
  | 'souvenirs'
  | 'traffic'
  | 'experience'
  | 'attractions';

export interface Expenses {
  flight?: number;
  food?: number;
  hotel?: number;
  souvenirs?: number;
  traffic?: number;
  experience?: number;
  attractions?: number;
}

export interface Trip {
  id: string;
  destination: string;
  partner: Partner | string;
  expenses: Expenses;
  total: number;
  date: string; // ISO date string
  coverImage?: number; // require() image
}

export type QuestionType = 'partner' | ExpenseCategory;

export interface QuestionConfig {
  id: QuestionType;
  question: string;
  image: number; // require() image
}
