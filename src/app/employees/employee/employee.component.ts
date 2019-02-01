import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../shared/employee.service';
import {ApiService} from '../../shared/api.service';
import {Skill} from '../model/skill';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  skills: Skill[] = [];

  constructor(private employeeService: EmployeeService, private apiService: ApiService) { }

  ngOnInit() {
    this.getAllSkills();
  }

  onClear() {
    this.employeeService.form.reset();
    this.employeeService.initializeFormGroup();
  }


  getAllSkills() {
    this.apiService.getAllSkills().subscribe(
      res => {
        this.skills = res;
      },
      err => {
        alert(err);
      }
    );
  }

  onSubmit() {
    this.apiService.saveEmployee(this.employeeService.form.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
