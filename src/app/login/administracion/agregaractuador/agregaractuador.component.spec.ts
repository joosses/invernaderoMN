import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaractuadorComponent } from './agregaractuador.component';

describe('AgregaractuadorComponent', () => {
  let component: AgregaractuadorComponent;
  let fixture: ComponentFixture<AgregaractuadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregaractuadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaractuadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
