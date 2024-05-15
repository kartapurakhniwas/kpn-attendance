import { TestBed } from '@angular/core/testing';

import { FleetAPIService } from './fleet-api.service';

describe('FleetAPIService', () => {
  let service: FleetAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FleetAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
