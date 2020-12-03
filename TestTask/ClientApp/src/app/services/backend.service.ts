import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private httpClient: HttpClient) {
  }
  public getEmployeeRecords(skip: number, take: number): Observable<any> {
    return this.httpClient.get(`/api/employees/employees?skip=${skip}&take=${take}`);
  }
  public getWorkingEmployeeRecords(skip: number, take: number): Observable<any> {
    return this.httpClient.get(`/api/employees/workingemployees?skip=${skip}&take=${take}`);
  }
  public addPosition(position: string): Observable<any> {
    return this.httpClient.post(`/api/position/addposition`, {
      PositionName: position
    });
  }
  public getPositions(): Observable<any> {
    return this.httpClient.get(`/api/position/positions`);
  }
  public addEmployee(employeePosition: any): Observable<any> {
    return this.httpClient.post(`/api/employees/employeecreate`, employeePosition);
  }
  public getFirstName(pattern: string): Observable<any> {
    return this.httpClient.get(`/api/employees/firstnames/${pattern}`);
  }
  public getLastName(pattern: string): Observable<any> {
    return this.httpClient.get(`/api/employees/lastnames/${pattern}`);
  }
}
