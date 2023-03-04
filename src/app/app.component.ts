import { EmployeeAddEditComponent } from './employee-add-edit/employee-add-edit.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud-app';

  constructor(private _dialog: MatDialog){}

  openAddEditEmployeeForm(): void {
    this._dialog.open(EmployeeAddEditComponent, {
      width: '600px',
      enterAnimationDuration: '150ms',
      exitAnimationDuration: '150ms',
    });

  }
}
