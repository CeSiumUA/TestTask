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
  public addPosition(position: string): Observable<any> {
    return this.httpClient.post(`/api/position/addposition`, {
      PositionName: position
    });
  }
}
