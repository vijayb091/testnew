import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForadvisorComponent } from './foradvisor.component';

describe('ForadvisorComponent', () => {
  let component: ForadvisorComponent;
  let fixture: ComponentFixture<ForadvisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForadvisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForadvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
