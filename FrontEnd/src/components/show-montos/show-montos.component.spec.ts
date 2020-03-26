import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMontosComponent } from './show-montos.component';

describe('ShowMontosComponent', () => {
  let component: ShowMontosComponent;
  let fixture: ComponentFixture<ShowMontosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMontosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMontosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
