import { TestBed, inject } from '@angular/core/testing';

import { PostTweetService } from './post-tweet.service';

describe('PostTweetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostTweetService]
    });
  });

  it('should be created', inject([PostTweetService], (service: PostTweetService) => {
    expect(service).toBeTruthy();
  }));
});
