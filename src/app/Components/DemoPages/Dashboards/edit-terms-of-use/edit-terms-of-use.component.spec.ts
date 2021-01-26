import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTermsOfUseComponent } from './edit-terms-of-use.component';

describe('EditTermsOfUseComponent', () => {
  let component: EditTermsOfUseComponent;
  let fixture: ComponentFixture<EditTermsOfUseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTermsOfUseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTermsOfUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
