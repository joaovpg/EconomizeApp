import { TestBed } from '@angular/core/testing';

import { TransationsService } from './transations.service';

describe('TransationsService', () => {
  let service: TransationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
