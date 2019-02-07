import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../employees/model/employee';
import {Skill} from '../employees/model/skill';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = 'http://localhost:8080/api';
  private ALL_EMPLOYEES_URL = `${this.BASE_URL}/employees/all`;
  private SAVE_UPDATE_EMPLOYEE_URL = `${this.BASE_URL}/employees`;
  private SAVE_UPDATE_SKILL_URL = `${this.BASE_URL}/skills`;
  private ALL_SKILLS_URL = `${this.BASE_URL}/skills/all`;
  private DELETE_EMPLOYEE_URL = `${this.BASE_URL}/employees/`;
  private DELETE_SKILL_URL = `${this.BASE_URL}/skills/`;

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.ALL_EMPLOYEES_URL);
  }

  saveEmployee(employee: Employee): Observable<any> {
    return this.http.post(this.SAVE_UPDATE_EMPLOYEE_URL, employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.DELETE_EMPLOYEE_URL + id);
  }

  getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.ALL_SKILLS_URL);
  }

  saveSkill(skill: Skill): Observable<any> {
    return this.http.post(this.SAVE_UPDATE_SKILL_URL, skill);
  }

  deleteSkill(id: number) {
    return this.http.delete(this.DELETE_SKILL_URL + id);
  }
}
