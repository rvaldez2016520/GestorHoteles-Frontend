import { TestBed } from '@angular/core/testing';

import { RestInvoiceService } from './rest-invoice.service';

describe('RestInvoiceService', () => {
  let service: RestInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
