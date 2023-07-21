import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Umbrellas';
  imageWidth = 100;
  imageMargin = 2;
  showImage = false;
  private _listFilter = '';
  errorMessage = '';
  sub!: Subscription;
  constructor(private productService: ProductService) {}
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filerBy: string): IProduct[] {
    filerBy = filerBy.toLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLowerCase().includes(filerBy)
    );
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Umbrellas: ' + message;
  }
}
