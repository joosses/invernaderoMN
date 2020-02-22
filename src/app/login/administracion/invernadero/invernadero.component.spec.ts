import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvernaderoComponent } from './invernadero.component';

describe('InvernaderoComponent', () => {
  let component: InvernaderoComponent;
  let fixture: ComponentFixture<InvernaderoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvernaderoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvernaderoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
