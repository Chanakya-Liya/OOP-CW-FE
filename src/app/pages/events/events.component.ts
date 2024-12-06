import { Component } from '@angular/core';
import { EventInfoComponent } from '../../components/event-info/event-info.component';


@Component({
  selector: 'app-events',
  imports: [EventInfoComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

}
