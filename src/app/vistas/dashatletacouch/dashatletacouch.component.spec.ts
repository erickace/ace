import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashatletacouchComponent } from './dashatletacouch.component';

describe('DashatletacouchComponent', () => {
  let component: DashatletacouchComponent;
  let fixture: ComponentFixture<DashatletacouchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashatletacouchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashatletacouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
