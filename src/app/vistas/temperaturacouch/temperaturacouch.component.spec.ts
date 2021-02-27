import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperaturacouchComponent } from './temperaturacouch.component';

describe('TemperaturacouchComponent', () => {
  let component: TemperaturacouchComponent;
  let fixture: ComponentFixture<TemperaturacouchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperaturacouchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperaturacouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
