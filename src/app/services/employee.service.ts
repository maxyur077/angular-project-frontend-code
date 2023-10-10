import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}

  addSweet(data: any): Observable<any> {
    return this._http.post('http://localhost:4210/chocolate', data);
  }

  updateSweet(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:4210/chocolate/${id}`, data);
  }

  getSweetList(): Observable<any> {
    return this._http.get('http://localhost:4210/chocolate');
  }

  deleteSweet(id: number): Observable<any> {
    return this._http.delete(`http://localhost:4210/chocolate/${id}`);
  }
}
