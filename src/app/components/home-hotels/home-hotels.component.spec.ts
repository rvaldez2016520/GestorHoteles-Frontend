import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHotelsComponent } from './home-hotels.component';

describe('HomeHotelsComponent', () => {
  let component: HomeHotelsComponent;
  let fixture: ComponentFixture<HomeHotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeHotelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
