import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTasasComponent } from './tabla-tasas.component';

describe('TablaTasasComponent', () => {
  let component: TablaTasasComponent;
  let fixture: ComponentFixture<TablaTasasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaTasasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTasasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
