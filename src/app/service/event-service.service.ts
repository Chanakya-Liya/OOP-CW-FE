import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { eventCustomer } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  constructor(private http: HttpClient, private router: Router) {}
    apiUrl = 'http://localhost:8030/events';

    getAllEvents(): Observable<eventCustomer[]> {
      this.http.get<eventCustomer[]>(this.apiUrl + '/all').subscribe(data => {
        console.log(data); // Logs the fetched data
      }, error => {
        console.error('Error fetching events:', error); // Logs any errors
      });
      return this.http.get<eventCustomer[]>(this.apiUrl + '/all');
    }
}
