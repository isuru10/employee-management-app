import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from '../../shared/employee.service';
import {ApiService} from '../../shared/api.service';
import {Employee} from '../model/employee';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatDialogRef} from '@angular/material';
import {NotificationService} from '../../shared/notification.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/typings/chips';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  skills: string[] = [];
  selectedSkills: string[] = [];
  skillsCtrl = this.employeeService.form.controls['skills'];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredSkills: Observable<string[]>;

  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private employeeService: EmployeeService,
              private apiService: ApiService,
              public dialogRef: MatDialogRef<EmployeeComponent>, public notificationService: NotificationService) {
    this.filteredSkills = this.skillsCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.skills.slice()));
  }

  ngOnInit() {
    this.getAllSkills();
  }

  onClear() {
    this.employeeService.form.reset();
    this.employeeService.initializeFormGroup();
    this.selectedSkills.splice(0, this.selectedSkills.length);
    this.getAllSkills();
  }


  getAllSkills() {
    this.apiService.getAllSkills().subscribe(
      res => {
        this.skills = res.map(skill => {
          return skill.description;
        });
        this.employeeService.form.controls['skills'].value.forEach(
          skill => {
            this.selectedSkills.push(skill);
            const index = this.skills.indexOf(skill);
            this.skills.splice(index, 1);
          }
        );
      },
      err => {
        alert(err);
      }
    );
  }

  onSubmit() {
    this.skillsCtrl.setValue(this.selectedSkills);
    const value = this.employeeService.form.value;
    const employee = new Employee(value.id, value.name, value.email, value.dob, value.skills);
    this.apiService.saveEmployee(employee).subscribe(
      res => {
        this.onClose();
        this.notificationService.success('Employee saved successfully!');
      },
      err => {
        alert(err['message']);
      }
    );
  }

  onClose() {
    this.employeeService.form.reset();
    this.employeeService.initializeFormGroup();
    this.dialogRef.close();
  }

  remove(skill: string) {
    const index = this.selectedSkills.indexOf(skill);
    this.selectedSkills.splice(index, 1);
    this.skills.push(skill);
  }

  // add(event: MatChipInputEvent): void {
  //   // Add fruit only when MatAutocomplete is not open
  //   // To make sure this does not conflict with OptionSelected Event
  //   if (!this.matAutocomplete.isOpen) {
  //     const input = event.input;
  //     const value = event.value;
  //
  //     // Add our fruit
  //     if ((value || '').trim()) {
  //       this.selectedSkills.push(value.trim());
  //     }
  //
  //     // Reset the input value
  //     if (input) {
  //       input.value = '';
  //     }
  //
  //     this.skillsCtrl.setValue(null);
  //   }
  // }

  selected(event: MatAutocompleteSelectedEvent): void {
    const index = this.skills.indexOf(event.option.viewValue);
    this.selectedSkills.push(event.option.viewValue);
    this.skills.splice(index, 1);
    this.skillInput.nativeElement.value = '';
    this.skillsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
      if (typeof value === 'string' ) {
        const filterValue = value.toLowerCase();
        return this.skills.filter(skill => skill.toLowerCase().indexOf(filterValue) === 0);
      } else {
        return null;
      }
  }
}
