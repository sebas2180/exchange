import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiarioComponent } from './beneficiario.component';

describe('BeneficiarioComponent', () => {
  let component: BeneficiarioComponent;
  let fixture: ComponentFixture<BeneficiarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
