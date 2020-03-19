import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTasasComponent } from './panel-tasas.component';

describe('PanelTasasComponent', () => {
  let component: PanelTasasComponent;
  let fixture: ComponentFixture<PanelTasasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelTasasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelTasasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
