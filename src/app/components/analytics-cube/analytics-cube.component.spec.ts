import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsCubeComponent } from './analytics-cube.component';

describe('AnalyticsCubeComponent', () => {
  let component: AnalyticsCubeComponent;
  let fixture: ComponentFixture<AnalyticsCubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsCubeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsCubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
