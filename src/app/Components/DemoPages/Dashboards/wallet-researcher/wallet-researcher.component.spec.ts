import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletResearcherComponent } from './wallet-researcher.component';

describe('WalletResearcherComponent', () => {
  let component: WalletResearcherComponent;
  let fixture: ComponentFixture<WalletResearcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletResearcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletResearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
