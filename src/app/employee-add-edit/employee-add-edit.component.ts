import { EmployeeService } from './../services/employee.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent {

  employeeForm: FormGroup;

  education: string[] = [
    'Metric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ]

  constructor(private _fb: FormBuilder, private _employeeService: EmployeeService, private _dialogRef: DialogRef<EmployeeAddEditComponent>){
    this.employeeForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: ''
    })
  }

  onFormSubmit() {
    if (this.employeeForm.valid) {
      this._employeeService.addEmployee( this.employeeForm.value ).subscribe({
        next: (value: any) => {
            alert('employee added')
            this._dialogRef.close()
        },
        error: (err: any) => {
          alert(err)
        },
      })
    }
  }

}
