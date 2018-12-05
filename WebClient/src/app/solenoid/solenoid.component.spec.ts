import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolenoidComponent } from './solenoid.component';

describe('SolenoidComponent', () => {
  let component: SolenoidComponent;
  let fixture: ComponentFixture<SolenoidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolenoidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolenoidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
