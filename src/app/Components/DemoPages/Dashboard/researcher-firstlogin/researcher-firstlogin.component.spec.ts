import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearcherFirstloginComponent } from './researcher-firstlogin.component';

describe('ResearcherFirstloginComponent', () => {
  let component: ResearcherFirstloginComponent;
  let fixture: ComponentFixture<ResearcherFirstloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearcherFirstloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherFirstloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
