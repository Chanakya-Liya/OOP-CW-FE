import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketServiceService {

  constructor(private http: HttpClient) {}
    apiUrl = 'http://localhost:8030/tickets';

    getSoldTicketCount(): Observable<number> {
      this.http.get<number>(this.apiUrl + '/sold/count').subscribe(data => {
      }, error => {
        console.error('Error fetching events:', error); // Logs any errors
      });
      return this.http.get<number>(this.apiUrl + '/sold/count');
    }
}
