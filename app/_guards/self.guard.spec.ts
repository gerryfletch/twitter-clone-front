import { TestBed, async, inject } from '@angular/core/testing';

import { SelfGuard } from './self.guard';

describe('SelfGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelfGuard]
    });
  });

  it('should ...', inject([SelfGuard], (guard: SelfGuard) => {
    expect(guard).toBeTruthy();
  }));
});
