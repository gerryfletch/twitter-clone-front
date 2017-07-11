import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermaTweetComponent } from './perma-tweet.component';

describe('PermaTweetComponent', () => {
  let component: PermaTweetComponent;
  let fixture: ComponentFixture<PermaTweetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermaTweetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermaTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
