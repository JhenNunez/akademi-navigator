
import { Student } from "./Student";

export interface Course {
  id: string;
  code: string;
  name: string;
  school: string;
  students: Student[];
}
