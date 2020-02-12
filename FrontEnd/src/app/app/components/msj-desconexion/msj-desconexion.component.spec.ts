import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsjDesconexionComponent } from './msj-desconexion.component';

describe('MsjDesconexionComponent', () => {
  let component: MsjDesconexionComponent;
  let fixture: ComponentFixture<MsjDesconexionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsjDesconexionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsjDesconexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
