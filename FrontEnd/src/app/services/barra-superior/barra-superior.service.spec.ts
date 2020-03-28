import { TestBed } from '@angular/core/testing';

import { BarraSuperiorService } from './barra-superior.service';

describe('BarraSuperiorService', () => {
  let service: BarraSuperiorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarraSuperiorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
