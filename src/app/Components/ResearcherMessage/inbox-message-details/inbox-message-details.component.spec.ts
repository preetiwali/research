import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxMessageDetailsComponent } from './inbox-message-details.component';

describe('InboxMessageDetailsComponent', () => {
  let component: InboxMessageDetailsComponent;
  let fixture: ComponentFixture<InboxMessageDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxMessageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxMessageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
