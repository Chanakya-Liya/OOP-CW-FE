import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-logs',
  imports: [NgIf, NgFor],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent {
  selectedLogType: string = 'event'
  logs: string[] = [];
  private eventSource: EventSource | null = null;

  constructor(private http: HttpClient){}

  changeSelectedLogType(logType: string) {
    this.selectedLogType = logType;
    this.fetchLogs();
  }

  fetchLogs(): void {
    // Close the existing EventSource if any
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    this.logs = []; // Clear previous logs

    // Create a new EventSource for the selected log type
    this.eventSource = new EventSource(`http://localhost:8030/logs/${this.selectedLogType}`);
    this.eventSource.onmessage = (event) => {
      this.logs.push(event.data);
    };
    this.eventSource.onerror = (error) => {
      console.error('Error fetching logs:', error);
      this.eventSource?.close(); // Ensure the EventSource is closed on error
      this.eventSource = null;
    };
  }

  
}
