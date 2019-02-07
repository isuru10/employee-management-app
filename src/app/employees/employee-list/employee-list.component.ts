import {Component, OnInit, ViewChild} from '@angular/core';
import {Employee} from '../model/employee';
import {ApiService} from '../../shared/api.service';
import {MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig} from '@angular/material';
import {EmployeeComponent} from '../employee/employee.component';
import {EmployeeService} from '../../shared/employee.service';
import { NotificationService} from '../../shared/notification.service';

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
  constructor(private apiService: ApiService,
              private employeeService: EmployeeService, private dialog: MatDialog, private notificationService: NotificationService) { }

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.apiService.getAllEmployees().subscribe(
      res => {
        this.employees = res;
        this.listData = new MatTableDataSource<any>(this.employees);
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
    this.dialog.open(EmployeeComponent, dialogConfig).afterClosed().subscribe(
      res => {
        this.getAllEmployees();
      },
      err => {
        alert('Error while after close');
      }
    );
  }

  onEdit(row: any) {
    this.employeeService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EmployeeComponent, dialogConfig).afterClosed().subscribe(
      res => {
        this.getAllEmployees();
      },
      err => {
        alert('Error while after close');
      }
    );
  }

  onDelete(id: any) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.apiService.deleteEmployee(id).subscribe(
        res => {
          this.notificationService.success('Employee Deleted Successfully!');
          this.getAllEmployees();
        },
        err => {
          alert('Error!');
        }
      );
    }
  }
}
