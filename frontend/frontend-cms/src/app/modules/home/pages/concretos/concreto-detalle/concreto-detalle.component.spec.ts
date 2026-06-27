import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcretoDetalleComponent } from './concreto-detalle.component';

describe('ConcretoDetalleComponent', () => {
  let component: ConcretoDetalleComponent;
  let fixture: ComponentFixture<ConcretoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcretoDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcretoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
