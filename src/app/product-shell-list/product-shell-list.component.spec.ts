import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShellListComponent } from './product-shell-list.component';

describe('ProductShellListComponent', () => {
  let component: ProductShellListComponent;
  let fixture: ComponentFixture<ProductShellListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductShellListComponent]
    });
    fixture = TestBed.createComponent(ProductShellListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
