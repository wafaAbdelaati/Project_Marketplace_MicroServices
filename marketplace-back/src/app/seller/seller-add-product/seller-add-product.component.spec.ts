import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAddProductComponent } from './seller-add-product.component';

describe('SellerAddProductComponent', () => {
  let component: SellerAddProductComponent;
  let fixture: ComponentFixture<SellerAddProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerAddProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
