import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarsensorComponent } from './agregarsensor.component';

describe('AgregarsensorComponent', () => {
  let component: AgregarsensorComponent;
  let fixture: ComponentFixture<AgregarsensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarsensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarsensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
