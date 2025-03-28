
export interface Student {
  id: string;
  name: string;
  avatarUrl: string;
  pattern: string[]; // Array of animal patterns for authentication
  grade?: string;
  age?: number;
}
