import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyadvisorComponent } from './myadvisor.component';

describe('MyadvisorComponent', () => {
  let component: MyadvisorComponent;
  let fixture: ComponentFixture<MyadvisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyadvisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyadvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
