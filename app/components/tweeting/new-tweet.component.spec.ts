import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTweetComponent } from './new-tweet.component';

describe('NewTweetComponent', () => {
  let component: NewTweetComponent;
  let fixture: ComponentFixture<NewTweetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTweetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
