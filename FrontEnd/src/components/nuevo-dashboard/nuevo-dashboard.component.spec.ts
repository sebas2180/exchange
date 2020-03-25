import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoDashboardComponent } from './nuevo-dashboard.component';

describe('NuevoDashboardComponent', () => {
  let component: NuevoDashboardComponent;
  let fixture: ComponentFixture<NuevoDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
