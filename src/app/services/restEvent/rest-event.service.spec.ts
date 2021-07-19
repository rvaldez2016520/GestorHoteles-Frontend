import { TestBed } from '@angular/core/testing';

import { RestEventService } from './rest-event.service';

describe('RestEventService', () => {
  let service: RestEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
