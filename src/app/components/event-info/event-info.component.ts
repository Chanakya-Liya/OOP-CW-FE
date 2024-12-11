import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { eventCustomer } from '../../models/event.model';
import { countdown } from '../../models/countdown.model';
import { EventServiceService } from '../../service/event-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-info',
  imports: [],
  templateUrl: './event-info.component.html',
  styleUrl: './event-info.component.css'
})
export class EventInfoComponent implements OnInit {
  event: any;
  countdown: countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  private intervalId: any;
  constructor(private route: ActivatedRoute, private eventService : EventServiceService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.event = params; 
    });
    this.startCountdown(new Date(this.event.eventDate));
    this.startTicketCountUpdate();
  }

  startCountdown(targetDate: Date): void {
    this.updateCountdown(targetDate);
    this.intervalId = setInterval(() => {
      this.updateCountdown(targetDate);
    }, 1000);
  }

  updateCountdown(targetDate: Date): void {
    const now = new Date().getTime();
    const timeDifference = targetDate.getTime() - now;

    if (timeDifference > 0) {
      this.countdown.days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      this.countdown.hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.countdown.minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      this.countdown.seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    } else {
      this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      clearInterval(this.intervalId);
    }
  }

  getEventPhoto(name: string): string {
    const regex = /\/(\d+)\.jpg$/; 
    const match = name.match(regex);
    const fileName: number | null = match ? parseInt(match[1], 10) : null;
    return "http://localhost:8030/photo/image?imageName=" + fileName;
  }

  availableSeats: number = 0;

  getTicketCount(): void {
    this.eventService.getEvent(this.event.id).subscribe(
      (value: eventCustomer) => {
        this.availableSeats = value.availableSeats; 
      },
      (error) => {
        console.error('Error loading ticket count:', error);
        this.availableSeats = 10;
      }
    );
  }

  startTicketCountUpdate(): void {
    this.intervalId = setInterval(() => {
      this.getTicketCount(); 
    }, 1000);
  }

  buyTicket(): any {
    this.eventService.buyTicket(this.event.id);
  }

}
