import { TestBed } from '@angular/core/testing';

import { ContainerTrack } from './ContainerTrack.service';

describe('ContainerService', () => {
  let service: ContainerTrack;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContainerTrack);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
