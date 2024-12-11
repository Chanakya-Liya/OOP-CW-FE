import { Component } from '@angular/core';
import { AnalyticsCubeComponent } from '../../components/analytics-cube/analytics-cube.component';
import { SimulationStartFormComponent } from '../../components/simulation-start-form/simulation-start-form.component';
import { LogsComponent } from '../../components/logs/logs.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [AnalyticsCubeComponent, SimulationStartFormComponent, LogsComponent, NgIf],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  showStartForm = true;

  onStartSimulation() {
    this.showStartForm = false;
  }

}
