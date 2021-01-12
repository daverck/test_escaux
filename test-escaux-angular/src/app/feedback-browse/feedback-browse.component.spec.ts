import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackBrowseComponent } from './feedback-browse.component';

describe('FeedbackBrowseComponent', () => {
  let component: FeedbackBrowseComponent;
  let fixture: ComponentFixture<FeedbackBrowseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackBrowseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
