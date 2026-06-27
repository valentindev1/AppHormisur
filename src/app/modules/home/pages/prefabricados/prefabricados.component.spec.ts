import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefabricadosComponent } from './prefabricados.component';

describe('PrefabricadosComponent', () => {
  let component: PrefabricadosComponent;
  let fixture: ComponentFixture<PrefabricadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrefabricadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrefabricadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
