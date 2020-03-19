import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsjOkDepositComponent } from './msj-ok-deposit.component';

describe('MsjOkDepositComponent', () => {
  let component: MsjOkDepositComponent;
  let fixture: ComponentFixture<MsjOkDepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsjOkDepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsjOkDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
