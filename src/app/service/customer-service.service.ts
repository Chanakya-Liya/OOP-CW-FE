import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(private http: HttpClient) {}
    apiUrl = 'http://localhost:8030/customer';


    getCustomerCount(): Observable<number> {
      this.http.get<number>(this.apiUrl + '/count').subscribe(data => {
      }, error => {
        console.error('Error fetching events:', error); 
      });
      return this.http.get<number>(this.apiUrl + '/count');
    }
}
