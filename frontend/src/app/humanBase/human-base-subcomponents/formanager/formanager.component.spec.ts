import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormanagerComponent } from './formanager.component';

describe('FormanagerComponent', () => {
  let component: FormanagerComponent;
  let fixture: ComponentFixture<FormanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
