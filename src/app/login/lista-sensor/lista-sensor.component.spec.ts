import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSensorComponent } from './lista-sensor.component';

describe('ListaSensorComponent', () => {
  let component: ListaSensorComponent;
  let fixture: ComponentFixture<ListaSensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaSensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
