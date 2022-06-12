import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrologinComponent } from './registrologin.component';

describe('RegistrologinComponent', () => {
  let component: RegistrologinComponent;
  let fixture: ComponentFixture<RegistrologinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrologinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrologinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
