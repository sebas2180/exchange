import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDashboardComponent } from './show-dashboard.component';

describe('ShowDashboardComponent', () => {
  let component: ShowDashboardComponent;
  let fixture: ComponentFixture<ShowDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
