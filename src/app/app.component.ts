import { CoreService } from './core/core.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { EmployeeAddEditComponent } from './employee-add-edit/employee-add-edit.component';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'actions'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _employeeService: EmployeeService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmployeeForm(): void {
    const dialogAddEditEmployeeRef = this._dialog.open(EmployeeAddEditComponent, {
      width: '600px',
      enterAnimationDuration: '150ms',
      exitAnimationDuration: '150ms',
    });

    dialogAddEditEmployeeRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          console.log('refresh list')
          this.getEmployeeList();
        }
      }
    });
  }

  openEditEmployeeForm(data: any): void {
    const dialogAddEditEmployeeRef = this._dialog.open(EmployeeAddEditComponent, {
      width: '600px',
      enterAnimationDuration: '150ms',
      exitAnimationDuration: '150ms',
      data: data
    });

    dialogAddEditEmployeeRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          console.log('refresh list')
          this.getEmployeeList();
        }
      }
    });
  }

  openConfirmationDialog(_id: number): void {
    const dialogConfirmationRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      enterAnimationDuration: '150ms',
      exitAnimationDuration: '150ms',
    });

    dialogConfirmationRef.afterClosed().subscribe(res => {
      if ( res ) {
        this.deleteEmployee(_id);
      }
    });
  }

  getEmployeeList() {
    this._employeeService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteEmployee(id: number) {
    this._employeeService.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getEmployeeList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
