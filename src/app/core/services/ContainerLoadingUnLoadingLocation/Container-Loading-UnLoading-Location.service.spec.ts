import { TestBed } from '@angular/core/testing';

import { ContainerLoadingUnloadingLocationService } from './Container-Loading-UnLoading-Location.service';

describe('ContainerPickdropLocationService', () => {
  let service: ContainerLoadingUnloadingLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContainerLoadingUnloadingLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
