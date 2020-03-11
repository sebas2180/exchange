import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoBeneficiarioComponent } from './nuevo-beneficiario.component';

describe('NuevoBeneficiarioComponent', () => {
  let component: NuevoBeneficiarioComponent;
  let fixture: ComponentFixture<NuevoBeneficiarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoBeneficiarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
