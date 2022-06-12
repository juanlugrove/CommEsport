import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarjugadorComponent } from './buscarjugador.component';

describe('BuscarjugadorComponent', () => {
  let component: BuscarjugadorComponent;
  let fixture: ComponentFixture<BuscarjugadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarjugadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarjugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
