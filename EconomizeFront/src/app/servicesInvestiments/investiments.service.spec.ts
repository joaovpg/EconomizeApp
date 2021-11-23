import { TestBed } from '@angular/core/testing';

import { InvestimentService } from './investiments.service';

describe('TransationsService', () => {
  let service: InvestimentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestimentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
