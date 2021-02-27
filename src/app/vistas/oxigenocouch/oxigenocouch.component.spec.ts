import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OxigenocouchComponent } from './oxigenocouch.component';

describe('OxigenocouchComponent', () => {
  let component: OxigenocouchComponent;
  let fixture: ComponentFixture<OxigenocouchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OxigenocouchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OxigenocouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
