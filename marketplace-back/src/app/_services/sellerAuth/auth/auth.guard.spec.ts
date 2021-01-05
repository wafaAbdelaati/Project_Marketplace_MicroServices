import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuardSeller } from './auth.guard';

describe('AuthGuardSeller', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardSeller]
    });
  });

  it('should ...', inject([AuthGuardSeller], (guard: AuthGuardSeller) => {
    expect(guard).toBeTruthy();
  }));
});
