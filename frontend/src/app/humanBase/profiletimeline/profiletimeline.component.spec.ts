import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiletimelineComponent } from './profiletimeline.component';

describe('ProfiletimelineComponent', () => {
  let component: ProfiletimelineComponent;
  let fixture: ComponentFixture<ProfiletimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfiletimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfiletimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
