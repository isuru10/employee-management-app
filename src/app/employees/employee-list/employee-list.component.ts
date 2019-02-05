import {Component, OnInit, ViewChild} from '@angular/core';
import {Employee} from '../model/employee';
import {ApiService} from '../../shared/api.service';
import {MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig} from '@angular/material';
import {EmployeeComponent} from '../employee/employee.component';
import {EmployeeService} from '../../shared/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  listData: MatTableDataSource<any>;
  employees: Employee[] = [];
  displayedColumns: string[] = ['name', 'email', 'dob', 'skills', 'actions'];
  searchKey: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private apiService: ApiService, private employeeService: EmployeeService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.apiService.getAllEmployees().subscribe(
      res => {
        this.employees = res;
        this.listData = new MatTableDataSource<any>(res);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      },
      err => {
        alert(err);
      }
    );
  }

  onSearchClear() {
    this.searchKey = '';
    this.onKeyUp();
  }

  onKeyUp() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.employeeService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

  onEdit(row: any) {
    this.employeeService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EmployeeComponent, dialogConfig);
  }
}
