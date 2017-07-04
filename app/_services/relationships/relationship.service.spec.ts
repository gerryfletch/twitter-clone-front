import { TestBed, inject } from '@angular/core/testing';

import { RelationshipService } from './relationship.service';

describe('RelationshipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelationshipService]
    });
  });

  it('should be created', inject([RelationshipService], (service: RelationshipService) => {
    expect(service).toBeTruthy();
  }));
});
