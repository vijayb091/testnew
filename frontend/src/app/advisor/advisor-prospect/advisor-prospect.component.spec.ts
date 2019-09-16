import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorProspectComponent } from './advisor-prospect.component';

describe('AdvisorProspectComponent', () => {
  let component: AdvisorProspectComponent;
  let fixture: ComponentFixture<AdvisorProspectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorProspectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
