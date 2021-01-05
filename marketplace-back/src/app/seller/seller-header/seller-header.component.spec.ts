import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerHeaderComponent } from './seller-header.component';

describe('SellerHeaderComponent', () => {
  let component: SellerHeaderComponent;
  let fixture: ComponentFixture<SellerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
