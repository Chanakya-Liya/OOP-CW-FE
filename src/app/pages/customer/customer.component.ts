import { Component } from '@angular/core';
import { EventListComponent } from '../../components/event-list/event-list.component';


@Component({
  selector: 'app-customer',
  imports: [EventListComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  constructor() { }
}
