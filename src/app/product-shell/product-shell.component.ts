import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'um-product-shell',
  templateUrl: './product-shell.component.html',
  styleUrls: ['./product-shell.component.scss']
})
export class ProductShellComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  monthCount = 0;
  sub?: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      selectedProduct => {
        if (selectedProduct) {
          const start = new Date(selectedProduct.releaseDate as string);
          const now = new Date();
          this.monthCount = now.getMonth() - start.getMonth()
            + (12 * (now.getFullYear() - start.getFullYear()));
        } else {
          this.monthCount = 0;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
