import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcretosComponent } from './concretos.component';

describe('ConcretosComponent', () => {
  let component: ConcretosComponent;
  let fixture: ComponentFixture<ConcretosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcretosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcretosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
