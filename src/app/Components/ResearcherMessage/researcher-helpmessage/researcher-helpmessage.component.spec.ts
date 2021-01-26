import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearcherHelpmessageComponent } from './researcher-helpmessage.component';

describe('ResearcherHelpmessageComponent', () => {
  let component: ResearcherHelpmessageComponent;
  let fixture: ComponentFixture<ResearcherHelpmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearcherHelpmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherHelpmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
