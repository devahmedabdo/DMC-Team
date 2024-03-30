import { TestBed } from '@angular/core/testing';

import { DmcService } from './dmc.service';

describe('DmcService', () => {
  let service: DmcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
