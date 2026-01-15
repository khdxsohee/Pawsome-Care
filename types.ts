
export type PetType = 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';

export interface Pet {
  id: string;
  name: string;
  type: PetType;
  breed: string;
  age: number;
  weight: number;
  image: string;
  lastCheckup?: string;
}

export interface Reminder {
  id: string;
  petId: string;
  title: string;
  time: string;
  type: 'feeding' | 'medication' | 'grooming' | 'walk' | 'vet';
  completed: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  PETS = 'pets',
  AI_EXPERT = 'ai_expert',
  RECORDS = 'records'
}
