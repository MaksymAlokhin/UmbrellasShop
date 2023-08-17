import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from '../products/product';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'um-product-shell-list',
  templateUrl: './product-shell-list.component.html',
  styleUrls: ['./product-shell-list.component.scss']
})
export class ProductShellListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  products: IProduct[] = [];
  errorMessage = '';

    // Need to handle null to allow for no selected product.
    selectedProduct: IProduct | null = null;
    sub?: Subscription;

    constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      selectedProduct => this.selectedProduct = selectedProduct
    );

    this.productService.getProducts().subscribe({
      next: products => this.products = products,
      error: err => this.errorMessage = err
    });
  }

  onSelected(product: IProduct): void {
    this.productService.changeSelectedProduct(product);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
