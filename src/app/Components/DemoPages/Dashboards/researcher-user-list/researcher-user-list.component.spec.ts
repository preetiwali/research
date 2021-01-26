import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearcherUserListComponent } from './researcher-user-list.component';

describe('ResearcherUserListComponent', () => {
  let component: ResearcherUserListComponent;
  let fixture: ComponentFixture<ResearcherUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearcherUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
