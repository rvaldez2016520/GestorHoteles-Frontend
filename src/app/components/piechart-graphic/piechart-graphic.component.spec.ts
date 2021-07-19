import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartGraphicComponent } from './piechart-graphic.component';

describe('PiechartGraphicComponent', () => {
  let component: PiechartGraphicComponent;
  let fixture: ComponentFixture<PiechartGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiechartGraphicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiechartGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
