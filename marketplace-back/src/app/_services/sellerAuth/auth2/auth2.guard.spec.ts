import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuardSeller2 } from './auth2.guard';

describe('AuthGuard2', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardSeller2]
    });
  });

  it('should ...', inject([AuthGuardSeller2], (guard: AuthGuardSeller2) => {
    expect(guard).toBeTruthy();
  }));
});
