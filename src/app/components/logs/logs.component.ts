import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-logs',
  imports: [NgIf, NgFor],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent {
  selectedLogType: string = 'vendor'

  changeSelectedLogType(logType: string) {
    this.selectedLogType = logType;
  }

  vendorLogs: string[] = ['Vendor log 1', 'Vendor log 2', 'Vendor log 3','Vendor log 1', 'Vendor log 2', 'Vendor log 3','Vendor log 1', 'Vendor log 2', 'Vendor log 3','Vendor log 1', 'Vendor log 2', 'Vendor log 3'];
  customerLogs: string[] = ['Customer log 1', 'Customer log 2', 'Customer log 3'];
  eventLogs: string[] = ['Event log 1', 'Event log 2', 'Event log 3'];
}
