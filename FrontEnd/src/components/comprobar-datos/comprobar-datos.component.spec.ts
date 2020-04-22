import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobarDatosComponent } from './comprobar-datos.component';

describe('ComprobarDatosComponent', () => {
  let component: ComprobarDatosComponent;
  let fixture: ComponentFixture<ComprobarDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprobarDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobarDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
