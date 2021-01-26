import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountResearcherComponent } from './account-researcher.component';

describe('AccountResearcherComponent', () => {
  let component: AccountResearcherComponent;
  let fixture: ComponentFixture<AccountResearcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountResearcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountResearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
