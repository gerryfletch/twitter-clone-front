import { TestBed, inject } from '@angular/core/testing';

import { GetTagService } from './get-tag.service';

describe('GetTagService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetTagService]
    });
  });

  it('should be created', inject([GetTagService], (service: GetTagService) => {
    expect(service).toBeTruthy();
  }));
});
