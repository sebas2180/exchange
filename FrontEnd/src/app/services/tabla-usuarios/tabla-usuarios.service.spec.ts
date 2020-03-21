import { TestBed } from '@angular/core/testing';

import { TablaUsuariosService } from './tabla-usuarios.service';

describe('TablaUsuariosService', () => {
  let service: TablaUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablaUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
