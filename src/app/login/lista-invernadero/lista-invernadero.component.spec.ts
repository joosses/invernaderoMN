import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInvernaderoComponent } from './lista-invernadero.component';

describe('ListaInvernaderoComponent', () => {
  let component: ListaInvernaderoComponent;
  let fixture: ComponentFixture<ListaInvernaderoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaInvernaderoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaInvernaderoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
