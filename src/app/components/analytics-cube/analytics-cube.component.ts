import { Component } from '@angular/core';
import { CustomerServiceService } from '../../service/customer-service.service';
import { OnInit } from '@angular/core';
import { EventServiceService } from '../../service/event-service.service';
import { VendorServiceService } from '../../service/vendor-service.service';
import { TicketServiceService } from '../../service/ticket-service.service';

@Component({
  selector: 'app-analytics-cube',
  imports: [],
  templateUrl: './analytics-cube.component.html',
  styleUrl: './analytics-cube.component.css'
})
export class AnalyticsCubeComponent implements OnInit {
  customers: number = 0;
  vendors: number = 0;
  events: number = 0;
  ticketsSold: number = 0;

  constructor(private customerService: CustomerServiceService, private eventService: EventServiceService, private vendorService: VendorServiceService, private ticketService: TicketServiceService) {}

  ngOnInit() {

    this.getCounts();

    // this.customerService.getVendorCount().subscribe(data => {
    //   this.vendors = data;
    // });

    // this.customerService.getEventCount().subscribe(data => {
    //   this.events = data;
    // });

    // this.customerService.getTicketsSold().subscribe(data => {
    //   this.ticketsSold = data;
    // });
  }

  getCounts(): void {
    setInterval(() => {
      this.customerService.getCustomerCount().subscribe(data => {
        this.customers = data;
      });

      this.eventService.getEventCount().subscribe(data => {
        this.events = data;
      });

      this.vendorService.getVendorCount().subscribe(data => {
        this.vendors = data;
      });

      this.ticketService.getSoldTicketCount().subscribe(data => {
        this.ticketsSold = data;
      });
    }, 1000)
    
  }
}
