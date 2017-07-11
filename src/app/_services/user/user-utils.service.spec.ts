import { TestBed, inject } from '@angular/core/testing';

import { UserUtilsService } from './user-utils.service';

describe('UserUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserUtilsService]
    });
  });

  it('should be created', inject([UserUtilsService], (service: UserUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
