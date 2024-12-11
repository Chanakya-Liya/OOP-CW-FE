import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationStartFormComponent } from './simulation-start-form.component';

describe('SimulationStartFormComponent', () => {
  let component: SimulationStartFormComponent;
  let fixture: ComponentFixture<SimulationStartFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationStartFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulationStartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
