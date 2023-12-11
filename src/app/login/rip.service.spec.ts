import { TestBed } from '@angular/core/testing';

import { RipService } from './rip.service';

describe('RipService', () => {
  let service: RipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
