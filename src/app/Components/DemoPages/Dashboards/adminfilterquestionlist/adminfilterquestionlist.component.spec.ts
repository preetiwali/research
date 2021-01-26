import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminfilterquestionlistComponent } from './adminfilterquestionlist.component';

describe('AdminfilterquestionlistComponent', () => {
  let component: AdminfilterquestionlistComponent;
  let fixture: ComponentFixture<AdminfilterquestionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminfilterquestionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminfilterquestionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
