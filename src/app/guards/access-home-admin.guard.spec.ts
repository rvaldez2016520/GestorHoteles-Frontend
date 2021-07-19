import { TestBed } from '@angular/core/testing';

import { AccessHomeAdminGuard } from './access-home-admin.guard';

describe('AccessHomeAdminGuard', () => {
  let guard: AccessHomeAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccessHomeAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
