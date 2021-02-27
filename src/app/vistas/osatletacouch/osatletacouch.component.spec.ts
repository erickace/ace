import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsatletacouchComponent } from './osatletacouch.component';

describe('OsatletacouchComponent', () => {
  let component: OsatletacouchComponent;
  let fixture: ComponentFixture<OsatletacouchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsatletacouchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsatletacouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
