import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { eventCustomer } from '../../models/event.model';
import { DatePipe, NgIf } from '@angular/common';
import { ImageServiceService } from '../../service/image-service.service';
import { Router } from '@angular/router';
import { query } from '@angular/animations';

@Component({
  selector: 'app-event-card',
  imports: [DatePipe],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent implements OnInit {

  @Input() event!: eventCustomer;

  constructor(private imageService: ImageServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  getEventPhoto(name: string): string {
    const regex = /\/(\d+)\.jpg$/; // Matches "/<number>.jpg" at the end of the path
    const match = name.match(regex);
    const fileName: number | null = match ? parseInt(match[1], 10) : null;
    return "http://localhost:8030/photo/image?imageName=" + fileName;
  }

  viewEvent(event: eventCustomer) {
    this.router.navigate(['/event'], { queryParams: event });
  }
}
