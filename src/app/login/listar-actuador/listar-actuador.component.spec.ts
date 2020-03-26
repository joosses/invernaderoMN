import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarActuadorComponent } from './listar-actuador.component';

describe('ListarActuadorComponent', () => {
  let component: ListarActuadorComponent;
  let fixture: ComponentFixture<ListarActuadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarActuadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarActuadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
