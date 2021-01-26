import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearcherHelpFAQComponent } from './researcher-help-faq.component';

describe('ResearcherHelpFAQComponent', () => {
  let component: ResearcherHelpFAQComponent;
  let fixture: ComponentFixture<ResearcherHelpFAQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearcherHelpFAQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherHelpFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
