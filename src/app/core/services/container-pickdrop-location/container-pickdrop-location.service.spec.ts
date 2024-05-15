import { TestBed } from '@angular/core/testing';

import { ContainerPickdropLocationService } from './container-pickdrop-location.service';

describe('ContainerPickdropLocationService', () => {
  let service: ContainerPickdropLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContainerPickdropLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
