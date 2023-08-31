import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditInfoComponent } from './product-edit-info.component';

describe('ProductEditInfoComponent', () => {
  let component: ProductEditInfoComponent;
  let fixture: ComponentFixture<ProductEditInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductEditInfoComponent]
    });
    fixture = TestBed.createComponent(ProductEditInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
