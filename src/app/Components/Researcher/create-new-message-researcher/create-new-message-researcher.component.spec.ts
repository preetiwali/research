import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewMessageResearcherComponent } from './create-new-message-researcher.component';

describe('CreateNewMessageResearcherComponent', () => {
  let component: CreateNewMessageResearcherComponent;
  let fixture: ComponentFixture<CreateNewMessageResearcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewMessageResearcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewMessageResearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
