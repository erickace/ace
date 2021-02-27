import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RcatletacouchComponent } from './rcatletacouch.component';

describe('RcatletacouchComponent', () => {
  let component: RcatletacouchComponent;
  let fixture: ComponentFixture<RcatletacouchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RcatletacouchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RcatletacouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
