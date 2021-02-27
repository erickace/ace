import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TcatletacouchComponent } from './tcatletacouch.component';

describe('TcatletacouchComponent', () => {
  let component: TcatletacouchComponent;
  let fixture: ComponentFixture<TcatletacouchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TcatletacouchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TcatletacouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
