import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumandetailComponent } from './humandetail.component';

describe('HumandetailComponent', () => {
  let component: HumandetailComponent;
  let fixture: ComponentFixture<HumandetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumandetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumandetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
