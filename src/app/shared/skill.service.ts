import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormGroup, FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    description: new FormControl('')
  });
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      description: ''
    });
  }
  populateForm(row: any) {
    this.form.setValue({id: row.id, description: row.description});
  }
}
