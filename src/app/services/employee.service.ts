import { Employee } from './../models/employee';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly API: string = 'http://localhost:3000/employees'

  constructor(private _http: HttpClient) {}

  addEmployee (data: any): Observable<any> {
    return this._http.post(`${this.API}`, data)
  }

  getEmployeeList (): Observable<any> {
    return this._http.get(`${this.API}`)
  }
}
