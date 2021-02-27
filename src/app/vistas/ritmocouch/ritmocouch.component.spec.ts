import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RitmocouchComponent } from './ritmocouch.component';

describe('RitmocouchComponent', () => {
  let component: RitmocouchComponent;
  let fixture: ComponentFixture<RitmocouchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RitmocouchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RitmocouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
