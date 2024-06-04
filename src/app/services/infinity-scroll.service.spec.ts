import { TestBed } from '@angular/core/testing';

import { InfinityScrollService } from './infinity-scroll.service';

describe('InfinityScrollService', () => {
  let service: InfinityScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfinityScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
