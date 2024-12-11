import { NgIf } from '@angular/common';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { SimulationServiceService } from '../../service/simulation-service.service';

@Component({
  selector: 'app-simulation-start-form',
  imports: [NgIf, ReactiveFormsModule, FormsModule],
  templateUrl: './simulation-start-form.component.html',
  styleUrl: './simulation-start-form.component.css'
})
export class SimulationStartFormComponent implements OnInit {

  isSimulation : boolean = true;
  simulationForm : FormGroup;
  threadTestingForm : FormGroup;
  @Output() startSimulation = new EventEmitter<void>();

  changeSimulationStatus(value: boolean) {
    this.isSimulation = value;
    this.loadData();
  }

 hideForm(){
    this.startSimulation.emit();
  }

  constructor(private fb: FormBuilder, private simulationService: SimulationServiceService) {
    this.simulationForm = this.fb.group({
      EventCountMin: ['', [Validators.required, Validators.maxLength(2),Validators.min(1)]],
      EventCountMax: ['', [Validators.required, Validators.maxLength(2), Validators.max(30), minMaxValidator('eventCountMin')]],
      PoolSizeMin: ['', [Validators.required, Validators.maxLength(2),Validators.min(1)]],
      PoolSizeMax: ['', [Validators.required, Validators.maxLength(2), Validators.max(700), minMaxValidator('poolSizeMin')]],
      TotalEventTicketsMin: ['', [Validators.required, Validators.maxLength(2), Validators.min(1)]],
      TotalEventTicketsMax: ['', [Validators.required, Validators.maxLength(2), Validators.max(5000), minMaxValidator('totalEventTicketsMin')]],
      EventCreationFrequencyMin: ['', [Validators.required, Validators.maxLength(2), Validators.min(1)]],
      EventCreationFrequencyMax: ['', [Validators.required, Validators.maxLength(2), minMaxValidator('eventCreationFrequencyMin')]],
      CustomerCountMin: ['', [Validators.required, Validators.maxLength(2), Validators.min(1)]],
      CustomerCountMax: ['', [Validators.required, Validators.maxLength(2), minMaxValidator('customerCountMin'), Validators.max(500)]],
      RetrievalRateMin: ['', [Validators.required, Validators.maxLength(2), Validators.min(1)]],
      RetrievalRateMax: ['', [Validators.required, Validators.maxLength(2), minMaxValidator('retrievalRateMin'), Validators.max(50)]],
      CustomerFrequencyMin: ['', [Validators.required, Validators.maxLength(2), Validators.min(1)]],
      CustomerFrequencyMax: ['', [Validators.required, Validators.maxLength(2), minMaxValidator('customerFrequencyMin')]],
      VendorCountMin: ['', [Validators.required, Validators.maxLength(2), Validators.min(1)]],
      VendorCountMax: ['', [Validators.required, Validators.maxLength(2), minMaxValidator('vendorCountMin'), Validators.max(60)]],
      ReleaseRateMin: ['', [Validators.required, Validators.maxLength(2), Validators.min(1)]],
      ReleaseRateMax: ['', [Validators.required, Validators.maxLength(2), minMaxValidator('releaseRateMin'), Validators.max(250)]],
      VendorFrequencyMin: ['', [Validators.required, Validators.maxLength(2), Validators.min(1)]],
      VendorFrequencyMax: ['', [Validators.required, Validators.maxLength(2), minMaxValidator('vendorFrequencyMin')]],
    });

    this.threadTestingForm = this.fb.group({
      EventCount: ['', [Validators.required, Validators.maxLength(2),Validators.min(1), Validators.max(30)]],
      PoolSize: ['', [Validators.required, Validators.maxLength(2),Validators.min(1), Validators.max(700)]],
      TotalEventTickets: ['', [Validators.required, Validators.maxLength(2), Validators.min(1) , Validators.max(5000)]],
      EventCreationFrequency: ['', [Validators.required, Validators.maxLength(2), Validators.min(1)],],
      CustomerCount: ['', [Validators.required, Validators.maxLength(2), Validators.min(1) , Validators.max(500)]],
      RetrievalRate: ['', [Validators.required, Validators.maxLength(2), Validators.min(1) , Validators.max(50)],],
      CustomerFrequency: ['', [Validators.required, Validators.maxLength(2), Validators.min(1)],],
      VendorCount: ['', [Validators.required, Validators.maxLength(2), Validators.min(1) , Validators.max(60)],],
      ReleaseRate: ['', [Validators.required, Validators.maxLength(2), Validators.min(1) , Validators.max(250)],],
      VendorFrequency: ['', [Validators.required, Validators.maxLength(2), Validators.min(1)],],
    });
  }

  ngOnInit(){
    this.loadData();
  }

loadData(): void {
  if(this.isSimulation) {
    this.simulationService.getSimulationData('Simulation').subscribe((data) => {
      if (data?.event) {
        this.simulationForm.patchValue({
            EventCountMin: data.event.EventCountMin,
            EventCountMax: data.event.EventCountMax,
            PoolSizeMin: data.event.PoolSizeMin,
            PoolSizeMax: data.event.PoolSizeMax,
            TotalEventTicketsMin: data.event.TotalEventTicketsMin,
            TotalEventTicketsMax: data.event.TotalEventTicketsMax,
            EventCreationFrequencyMin: data.event.EventCreationFrequencyMin,
            EventCreationFrequencyMax: data.event.EventCreationFrequencyMax,
        });
    }

    if (data?.customer) {
        this.simulationForm.patchValue({
            CustomerCountMin: data.customer.CustomerCountMin,
            CustomerCountMax: data.customer.CustomerCountMax,
            RetrievalRateMin: data.customer.RetrievalRateMin,
            RetrievalRateMax: data.customer.RetrievalRateMax,
            CustomerFrequencyMin: data.customer.FrequencyMin,
            CustomerFrequencyMax: data.customer.FrequencyMax,
        });
    }

    if (data?.vendor) {
        this.simulationForm.patchValue({
            VendorCountMin: data.vendor.VendorCountMin,
            VendorCountMax: data.vendor.VendorCountMax,
            ReleaseRateMin: data.vendor.ReleaseRateMin,
            ReleaseRateMax: data.vendor.ReleaseRateMax,
            VendorFrequencyMin: data.vendor.FrequencyMin,
            VendorFrequencyMax: data.vendor.FrequencyMax,
        });
      }
    });
  }else{
    this.simulationService.getSimulationData('ThreadTesting').subscribe((data) => {
      if (data?.event) {
        this.threadTestingForm.patchValue({
            EventCount: data.event.EventCount,
            PoolSize: data.event.PoolSize,
            TotalEventTickets: data.event.TotalTicketCount,
            EventCreationFrequency: data.event.EventCreationFrequency,
        });
    }

    if (data?.customer) {
        this.threadTestingForm.patchValue({
            CustomerCount: data.customer.CustomerCount,
            RetrievalRate: data.customer.RetrievalRate,
            CustomerFrequency: data.customer.Frequency,
        });
    }

    if (data?.vendor) {
        this.threadTestingForm.patchValue({
            VendorCount: data.vendor.VendorCount,
            ReleaseRate: data.vendor.ReleaseRate,
            VendorFrequency: data.vendor.Frequency,
        });
      }
    });
  }
}

  getError(form: FormGroup, property:string, error:string): boolean | null {
    const control = form.get(property);
    if (control?.hasError(error) && (control?.touched || control?.dirty)) {
      return true;
    }
    return false;
  }

  getMisMatchError(form: FormGroup, property:string): boolean | null {
    const control = form.get(property);
    return control?.hasError('minMaxMismatch') && (control.touched || control.dirty) || false;
  }


  onSubmit(): void {
    if(!this.isSimulation){
      const formData = this.threadTestingForm.value;
      const transformedData = {
        event: {
          EventCount: formData.EventCount,
          PoolSize: formData.PoolSize,
          TotalTicketCount: formData.TotalEventTickets,
          EventCreationFrequency: formData.EventCreationFrequency
        },
        customer: {
          CustomerCount: formData.CustomerCount,
          RetrievalRate: formData.RetrievalRate,
          Frequency: formData.CustomerFrequency
        },
        vendor: {
          VendorCount: formData.VendorCount,
          ReleaseRate: formData.ReleaseRate,
          Frequency: formData.VendorFrequency
        }
      };
    
      // Call the service to send the transformed data to the backend
      this.simulationService.updateSimulationData('ThreadTesting', transformedData).subscribe(
        (response) => {
          console.log('Simulation data updated:', response);
          this.hideForm();
          this.simulationService.startSimulation('threadtesting').subscribe({
            next: (response) => console.log(response),
            error: (err) => console.error(err),
        });
        },
        (error) => {
          console.error('Error updating simulation data:', error);
        }
      );
    }else{
      const formData = this.simulationForm.value;
      const transformedData = {
        event: {
          EventCountMin: formData.EventCountMin,
          EventCountMax: formData.EventCountMax,
          PoolSizeMin: formData.PoolSizeMin,
          PoolSizeMax: formData.PoolSizeMax,
          TotalEventTicketsMin: formData.TotalEventTicketsMin,
          TotalEventTicketsMax: formData.TotalEventTicketsMax,
          EventCreationFrequencyMin: formData.EventCreationFrequencyMin,
          EventCreationFrequencyMax: formData.EventCreationFrequencyMax
        },
        customer: {
          CustomerCountMin: formData.CustomerCountMin,
          CustomerCountMax: formData.CustomerCountMax,
          RetrievalRateMin: formData.RetrievalRateMin,
          RetrievalRateMax: formData.RetrievalRateMax,
          FrequencyMin: formData.CustomerFrequencyMin,
          FrequencyMax: formData.CustomerFrequencyMax
        },
        vendor: {
          VendorCountMin: formData.VendorCountMin,
          VendorCountMax: formData.VendorCountMax,
          ReleaseRateMin: formData.ReleaseRateMin,
          ReleaseRateMax: formData.ReleaseRateMax,
          FrequencyMin: formData.VendorFrequencyMin,
          FrequencyMax: formData.VendorFrequencyMax
        }
      }

      this.simulationService.updateSimulationData('Simulation', transformedData).subscribe(
        (response) => {
          console.log('Simulation data updated:', response);
          this.hideForm();
          this.simulationService.startSimulation('simulation').subscribe({
            next: (response) => console.log(response),
            error: (err) => console.error(err),
        });
        },
        (error) => {
          console.error('Error updating simulation data:', error);
        }
      );
    }

  }

}





export function minMaxValidator(minControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control.parent;
    if (!form) return null;

    const minControl = form.get(minControlName);
    if (!minControl) return null;

    const min = parseFloat(minControl.value);
    const max = parseFloat(control.value);

    if (!isNaN(min) && !isNaN(max) && min > max) {
      return { minMaxMismatch: true }; // Error key
    }

    return null;
  };
}
