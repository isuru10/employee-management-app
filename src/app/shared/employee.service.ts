import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    dob: new FormControl(''),
    skills: new FormControl(null)
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      name: '',
      email: '',
      dob: '',
      skills: 0
    });
  }

  populateForm(row: any) {
    console.log(row);
    this.form.setValue(row);
  }
}
