import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpublishstudyComponent } from './adminpublishstudy.component';

describe('AdminpublishstudyComponent', () => {
  let component: AdminpublishstudyComponent;
  let fixture: ComponentFixture<AdminpublishstudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminpublishstudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpublishstudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
