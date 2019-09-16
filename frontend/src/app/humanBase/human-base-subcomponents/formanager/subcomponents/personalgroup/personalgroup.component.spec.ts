import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalgroupComponent } from './personalgroup.component';

describe('PersonalgroupComponent', () => {
  let component: PersonalgroupComponent;
  let fixture: ComponentFixture<PersonalgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
