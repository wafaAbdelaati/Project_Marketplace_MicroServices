import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProfilComponent } from './seller-profil.component';

describe('SellerProfilComponent', () => {
  let component: SellerProfilComponent;
  let fixture: ComponentFixture<SellerProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
