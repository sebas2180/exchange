import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAdministradorComponent } from './panel-administrador.component';

describe('PanelAdministradorComponent', () => {
  let component: PanelAdministradorComponent;
  let fixture: ComponentFixture<PanelAdministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
