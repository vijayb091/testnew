import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorCustomerComponent } from './advisor-customer.component';

describe('AdvisorCustomerComponent', () => {
  let component: AdvisorCustomerComponent;
  let fixture: ComponentFixture<AdvisorCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
