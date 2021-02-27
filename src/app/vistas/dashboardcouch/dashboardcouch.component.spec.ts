import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardcouchComponent } from './dashboardcouch.component';

describe('DashboardcouchComponent', () => {
  let component: DashboardcouchComponent;
  let fixture: ComponentFixture<DashboardcouchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardcouchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardcouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
