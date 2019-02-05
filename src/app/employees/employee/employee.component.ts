import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../shared/employee.service';
import {ApiService} from '../../shared/api.service';
import {Skill} from '../model/skill';
import {Employee} from '../model/employee';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  skills: Skill[] = [];

  constructor(private employeeService: EmployeeService,
              private apiService: ApiService, public dialogRef: MatDialogRef<EmployeeComponent>) { }

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
    const value = this.employeeService.form.value;
    const employee = new Employee(value.$key, value.name, value.email, value.dob, value.skills);
    this.apiService.saveEmployee(employee).subscribe(
      res => {
        this.employeeService.form.reset();
        this.employeeService.initializeFormGroup();
        this.onClose();
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  onClose() {
    this.employeeService.form.reset();
    this.employeeService.initializeFormGroup();
    this.dialogRef.close();
  }
}
