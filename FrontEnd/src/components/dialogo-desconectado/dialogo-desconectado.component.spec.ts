import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoDesconectadoComponent } from './dialogo-desconectado.component';

describe('DialogoDesconectadoComponent', () => {
  let component: DialogoDesconectadoComponent;
  let fixture: ComponentFixture<DialogoDesconectadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoDesconectadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoDesconectadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
