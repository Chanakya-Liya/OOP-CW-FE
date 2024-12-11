import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorServiceService {

  constructor(private http: HttpClient) {}
    apiUrl = 'http://localhost:8030/vendor';


    getVendorCount(): Observable<number> {
      this.http.get<number>(this.apiUrl + '/count').subscribe(data => {
      }, error => {
        console.error('Error fetching events:', error); // Logs any errors
      });
      return this.http.get<number>(this.apiUrl + '/count');
    }
}
