import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NegotiateComponent } from './negotiate.component';

describe('NegotiateComponent', () => {
  let component: NegotiateComponent;
  let fixture: ComponentFixture<NegotiateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NegotiateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegotiateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
