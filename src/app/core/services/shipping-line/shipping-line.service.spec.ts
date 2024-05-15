import { TestBed } from '@angular/core/testing';

import { ShippingLineService } from './shipping-line.service';

describe('ShippingLineService', () => {
  let service: ShippingLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShippingLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
