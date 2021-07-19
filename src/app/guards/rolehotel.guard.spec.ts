import { TestBed } from '@angular/core/testing';

import { RolehotelGuard } from './rolehotel.guard';

describe('RolehotelGuard', () => {
  let guard: RolehotelGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolehotelGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
