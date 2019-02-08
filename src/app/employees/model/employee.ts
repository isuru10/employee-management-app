import {Skill} from './skill';

export class Employee {
  id: number;
  name: string;
  email: string;
  dob: string;
  skills: Skill[];

  constructor(id: number, name: string, email: string, dob: string, skills: Skill[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.dob = dob;
    this.skills = skills;
  }
}
