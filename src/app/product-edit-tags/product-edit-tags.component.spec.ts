import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditTagsComponent } from './product-edit-tags.component';

describe('ProductEditTagsComponent', () => {
  let component: ProductEditTagsComponent;
  let fixture: ComponentFixture<ProductEditTagsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductEditTagsComponent]
    });
    fixture = TestBed.createComponent(ProductEditTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
