import { TestBed } from '@angular/core/testing';

import { PanelBeneficiarioServiceService } from './panel-beneficiario-service.service';

describe('PanelBeneficiarioServiceService', () => {
  let service: PanelBeneficiarioServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanelBeneficiarioServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
