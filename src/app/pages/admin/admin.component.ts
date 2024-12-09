import { Component } from '@angular/core';
import { AnalyticsCubeComponent } from '../../components/analytics-cube/analytics-cube.component';
import { SimulationStartFormComponent } from '../../components/simulation-start-form/simulation-start-form.component';

@Component({
  selector: 'app-admin',
  imports: [AnalyticsCubeComponent, SimulationStartFormComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
