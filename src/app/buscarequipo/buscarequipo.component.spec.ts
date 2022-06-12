import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarequipoComponent } from './buscarequipo.component';

describe('BuscarequipoComponent', () => {
  let component: BuscarequipoComponent;
  let fixture: ComponentFixture<BuscarequipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarequipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarequipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
