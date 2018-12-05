import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMenuComponent } from './device-menu.component';

describe('DeviceMenuComponent', () => {
  let component: DeviceMenuComponent;
  let fixture: ComponentFixture<DeviceMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
