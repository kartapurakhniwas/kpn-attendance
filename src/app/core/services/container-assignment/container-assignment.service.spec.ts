import { TestBed } from '@angular/core/testing';

import { ContainerAssignmentService } from './container-assignment.service';

describe('ContainerAssignmentService', () => {
  let service: ContainerAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContainerAssignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
