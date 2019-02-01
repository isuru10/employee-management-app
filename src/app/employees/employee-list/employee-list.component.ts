import { Component, OnInit } from '@angular/core';
import {Employee} from '../model/employee';
import {ApiService} from '../../shared/api.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  listData: MatTableDataSource<any>;
  employees: Employee[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.apiService.getAllEmployees().subscribe(
      res => {
        this.employees = res;
      },
      err => {
        alert(err);
      }
    );
  }
}
