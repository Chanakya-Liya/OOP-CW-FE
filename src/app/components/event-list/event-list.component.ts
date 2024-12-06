import { Component } from '@angular/core';
import { eventCustomer } from '../../models/event.model';
import { NgFor, NgIf } from '@angular/common';
import { EventCardComponent } from '../event-card/event-card.component';
import { EventServiceService } from '../../service/event-service.service';
import { ImageServiceService } from '../../service/image-service.service';

@Component({
  selector: 'app-event-list',
  imports: [NgFor, EventCardComponent, NgIf],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {
  events: eventCustomer[] = [];  // Array to store events
  loading: boolean = true;       // To handle loading state

  constructor(private eventService: EventServiceService, private imageService: ImageServiceService) { }

  ngOnInit(): void {
    this.loadCustomerEvents();
  }

  loadCustomerEvents(): void {
    console.log('Loading events...');
    this.eventService.getAllEvents().subscribe(
        (rawEvents) => {
            console.log('Raw Events:', rawEvents);
            this.events = rawEvents.map(event => ({
                id: event.id,
                name: event.name,
                description: event.description,
                availableSeats: event.availableSeats,
                photo: event.photo,
                eventDate: event.eventDate,
            }));
        },
        (error) => {
            console.error('Error loading events:', error);
        }
    );
    this.loading = false
}

loadVendorEvents(): void {
  
}
}
