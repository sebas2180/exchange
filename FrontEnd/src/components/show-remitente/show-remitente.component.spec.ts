import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRemitenteComponent } from './show-remitente.component';

describe('ShowRemitenteComponent', () => {
  let component: ShowRemitenteComponent;
  let fixture: ComponentFixture<ShowRemitenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRemitenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRemitenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
