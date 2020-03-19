import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploapComponent } from './file-uploap.component';

describe('FileUploapComponent', () => {
  let component: FileUploapComponent;
  let fixture: ComponentFixture<FileUploapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
