import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisatletasComponent } from './misatletas.component';

describe('MisatletasComponent', () => {
  let component: MisatletasComponent;
  let fixture: ComponentFixture<MisatletasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisatletasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisatletasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
