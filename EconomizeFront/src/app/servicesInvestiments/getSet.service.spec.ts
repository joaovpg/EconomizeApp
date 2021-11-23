import { TestBed } from '@angular/core/testing';

import { GetSetService } from './getSet.service';

describe('GetSetService', () => {
  let service: GetSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
