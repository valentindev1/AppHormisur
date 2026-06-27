import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloCarouselComponent } from './articulo-carousel.component';

describe('ArticuloCarouselComponent', () => {
  let component: ArticuloCarouselComponent;
  let fixture: ComponentFixture<ArticuloCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticuloCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticuloCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
