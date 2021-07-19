import { TestBed } from '@angular/core/testing';

import { RestHotelServiceService } from './rest-hotel-service.service';

describe('RestHotelServiceService', () => {
  let service: RestHotelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestHotelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
