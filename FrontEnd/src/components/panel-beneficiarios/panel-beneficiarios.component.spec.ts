import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelBeneficiariosComponent } from './panel-beneficiarios.component';

describe('PanelBeneficiariosComponent', () => {
  let component: PanelBeneficiariosComponent;
  let fixture: ComponentFixture<PanelBeneficiariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelBeneficiariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelBeneficiariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
