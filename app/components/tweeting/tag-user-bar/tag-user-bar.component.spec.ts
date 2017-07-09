import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagUserBarComponent } from './tag-user-bar.component';

describe('TagUserBarComponent', () => {
  let component: TagUserBarComponent;
  let fixture: ComponentFixture<TagUserBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagUserBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagUserBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
