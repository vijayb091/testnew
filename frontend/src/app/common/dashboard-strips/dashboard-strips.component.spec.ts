import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStripsComponent } from './dashboard-strips.component';

describe('DashboardStripsComponent', () => {
  let component: DashboardStripsComponent;
  let fixture: ComponentFixture<DashboardStripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardStripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardStripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
