import { CoreService } from './../core/core.service';
import { EmployeeService } from './../services/employee.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss'],
})
export class EmployeeAddEditComponent implements OnInit {
  employeeForm: FormGroup;

  education: string[] = [
    'Metric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private _fb: FormBuilder,
    private _employeeService: EmployeeService,
    private _dialogRef: MatDialogRef<EmployeeAddEditComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employeeForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  ngOnInit(): void {
    this.employeeForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.employeeForm.valid) {
      if (this.data) {
        this.updateEmployee()
      } else {
        this.saveEmployee()
      }
    }
  }

  updateEmployee() {
    this._employeeService.updateEmployee(this.data.id, this.employeeForm.value).subscribe({
      next: (value: any) => {
        this._coreService.openSnackBar('Employee Updated!', 'ok');
        this._dialogRef.close(true);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  saveEmployee() {
    this._employeeService.addEmployee(this.employeeForm.value).subscribe({
      next: (value: any) => {
        this._coreService.openSnackBar('Employee Added!', 'ok');
        this._dialogRef.close(true);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
