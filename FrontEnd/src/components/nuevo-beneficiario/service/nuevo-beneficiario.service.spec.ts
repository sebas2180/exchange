import { TestBed } from '@angular/core/testing';

import { NuevoBeneficiarioService } from './nuevo-beneficiario.service';

describe('NuevoBeneficiarioService', () => {
  let service: NuevoBeneficiarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevoBeneficiarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
