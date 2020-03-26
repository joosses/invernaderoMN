import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInvernaderoInactivosComponent } from './lista-invernadero-inactivos.component';

describe('ListaInvernaderoInactivosComponent', () => {
  let component: ListaInvernaderoInactivosComponent;
  let fixture: ComponentFixture<ListaInvernaderoInactivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaInvernaderoInactivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaInvernaderoInactivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
