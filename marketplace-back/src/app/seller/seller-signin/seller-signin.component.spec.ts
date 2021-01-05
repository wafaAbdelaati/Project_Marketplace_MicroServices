import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerSigninComponent } from './seller-signin.component';

describe('SellerSigninComponent', () => {
  let component: SellerSigninComponent;
  let fixture: ComponentFixture<SellerSigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerSigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
