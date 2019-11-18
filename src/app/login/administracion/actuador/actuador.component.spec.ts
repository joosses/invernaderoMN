import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuadorComponent } from './actuador.component';

describe('ActuadorComponent', () => {
  let component: ActuadorComponent;
  let fixture: ComponentFixture<ActuadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActuadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActuadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
