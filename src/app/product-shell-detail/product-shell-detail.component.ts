import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from '../products/product';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'um-product-shell-detail',
  templateUrl: './product-shell-detail.component.html',
  styleUrls: ['./product-shell-detail.component.scss']
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
  pageTitle = 'Product Detail';
  // Need to handle null to allow for no selected product.
  product: IProduct | null = null;  
  errorMessage = '';

  sub?: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      selectedProduct => this.product = selectedProduct
    );
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
