import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargingScreenComponent } from './charging-screen.component';

describe('ChargingScreenComponent', () => {
  let component: ChargingScreenComponent;
  let fixture: ComponentFixture<ChargingScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargingScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
