import {Skill} from './skill';

export interface Employee {
  id: number;
  name: string;
  email: string;
  dob: string;
  skills: Skill[];
}
