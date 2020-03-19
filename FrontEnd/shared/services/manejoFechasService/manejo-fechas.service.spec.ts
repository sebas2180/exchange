import { TestBed } from '@angular/core/testing';

import { ManejoFechasService } from './manejo-fechas.service';

describe('ManejoFechasService', () => {
  let service: ManejoFechasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManejoFechasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
