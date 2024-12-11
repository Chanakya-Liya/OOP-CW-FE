import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimulationServiceService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:8030/config';

  getSimulationData(mode: string): Observable<any> {
    const url = this.apiUrl + `/simulation-data?mode=${mode}`;
    return this.http.get(url);
  }

  updateSimulationData(section: string, data: any): Observable<any> {
    return this.http.put(this.apiUrl + `/update/${section}`, data, {responseType: 'text'});
  }

  startSimulation(section: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/start/${section}`, {}, { responseType: 'text' });
  }
}
