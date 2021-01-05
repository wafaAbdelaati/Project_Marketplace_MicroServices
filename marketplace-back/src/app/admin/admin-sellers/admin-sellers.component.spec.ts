import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSellersComponent } from './admin-sellers.component';

describe('AdminSellersComponent', () => {
  let component: AdminSellersComponent;
  let fixture: ComponentFixture<AdminSellersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSellersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
