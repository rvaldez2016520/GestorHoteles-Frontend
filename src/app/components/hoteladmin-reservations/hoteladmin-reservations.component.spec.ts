import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoteladminReservationsComponent } from './hoteladmin-reservations.component';

describe('HoteladminReservationsComponent', () => {
  let component: HoteladminReservationsComponent;
  let fixture: ComponentFixture<HoteladminReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoteladminReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoteladminReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
