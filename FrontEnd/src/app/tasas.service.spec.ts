import { TestBed } from '@angular/core/testing';

import { TasasService } from './tasas.service';

describe('TasasService', () => {
  let service: TasasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
