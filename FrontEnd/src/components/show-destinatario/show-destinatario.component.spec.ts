import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDestinatarioComponent } from './show-destinatario.component';

describe('ShowDestinatarioComponent', () => {
  let component: ShowDestinatarioComponent;
  let fixture: ComponentFixture<ShowDestinatarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDestinatarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
