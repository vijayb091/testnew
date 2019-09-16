import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessLifeComponent } from './business-life.component';

describe('BusinessLifeComponent', () => {
  let component: BusinessLifeComponent;
  let fixture: ComponentFixture<BusinessLifeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessLifeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
