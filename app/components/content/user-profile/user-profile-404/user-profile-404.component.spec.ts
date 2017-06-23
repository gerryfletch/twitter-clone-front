import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfile404Component } from './user-profile-404.component';

describe('UserProfile404Component', () => {
  let component: UserProfile404Component;
  let fixture: ComponentFixture<UserProfile404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfile404Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfile404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
