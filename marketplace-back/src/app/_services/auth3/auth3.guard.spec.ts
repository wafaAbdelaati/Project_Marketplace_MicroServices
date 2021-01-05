import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard3 } from './auth3.guard';

describe('AuthGuard3', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard3]
    });
  });

  it('should ...', inject([AuthGuard3], (guard: AuthGuard3) => {
    expect(guard).toBeTruthy();
  }));
});
