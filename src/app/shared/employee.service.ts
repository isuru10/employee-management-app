import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    dob: new FormControl(''),
    skills: new FormControl(0)
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      name: '',
      email: '',
      dob: '',
      skills: 0
    });
  }
}
