import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-simulation-start-form',
  imports: [NgIf, ReactiveFormsModule, FormsModule],
  templateUrl: './simulation-start-form.component.html',
  styleUrl: './simulation-start-form.component.css'
})
export class SimulationStartFormComponent {

  isSimulation : boolean = true;
  simulationForm : FormGroup;

  changeSimulationStatus(value: boolean) {
    this.isSimulation = value;
  }

  constructor(private fb: FormBuilder){
    this.simulationForm = this.fb.group({
      eventCountMin: ['', [Validators.required, Validators.maxLength(2)]],
      eventCountMax: ['', [Validators.required, Validators.maxLength(2)]],
      poolSizeMin: ['', [Validators.required, Validators.maxLength(2)]],
      poolSizeMax: ['', [Validators.required, Validators.maxLength(2)]],
      totalEventTicketsMin: ['', [Validators.required, Validators.maxLength(2)]],
      totalEventTicketsMax: ['', [Validators.required, Validators.maxLength(2)]],
      eventCreationFrequencyMin: ['', [Validators.required, Validators.maxLength(2)]],
      eventCreationFrequencyMax: ['', [Validators.required, Validators.maxLength(2)]],
      customerCountMin: ['', [Validators.required, Validators.maxLength(2)]],
      customerCountMax: ['', [Validators.required, Validators.maxLength(2)]],
      retrievalRateMin: ['', [Validators.required, Validators.maxLength(2)]],
      retrievalRateMax: ['', [Validators.required, Validators.maxLength(2)]],
      customerFrequencyMin: ['', [Validators.required, Validators.maxLength(2)]],
      customerFrequencyMax: ['', [Validators.required, Validators.maxLength(2)]],
      vendorCountMin: ['', [Validators.required, Validators.maxLength(2)]],
      vendorCountMax: ['', [Validators.required, Validators.maxLength(2)]],
      releaseRateMin: ['', [Validators.required, Validators.maxLength(2)]],
      releaseRateMax: ['', [Validators.required, Validators.maxLength(2)]],
      vendorFrequencyMin: ['', [Validators.required, Validators.maxLength(2)]],
      vendorFrequencyMax: ['', [Validators.required, Validators.maxLength(2)]],
    });
  }
}
