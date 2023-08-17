import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShellDetailComponent } from './product-shell-detail.component';

describe('ProductShellDetailComponent', () => {
  let component: ProductShellDetailComponent;
  let fixture: ComponentFixture<ProductShellDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductShellDetailComponent]
    });
    fixture = TestBed.createComponent(ProductShellDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
