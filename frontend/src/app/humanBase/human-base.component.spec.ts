import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanBaseComponent } from './human-base.component';

describe('HumanBaseComponent', () => {
  let component: HumanBaseComponent;
  let fixture: ComponentFixture<HumanBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumanBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumanBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
