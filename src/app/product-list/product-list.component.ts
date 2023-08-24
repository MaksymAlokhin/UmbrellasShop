import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IProduct } from '../products/product';
import { ProductService } from '../products/product.service';
import { Subscription } from 'rxjs';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParameterService } from '../products/product-parameter.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Umbrellas';
  includeDetail = true;
  imageWidth = 100;
  imageMargin = 2;
  errorMessage = '';
  sub!: Subscription;

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];
  @ViewChild(CriteriaComponent) filterComponent?: CriteriaComponent;

  get showImage(): boolean {
    return this.productParameterService.showImage;
  }
  set showImage(value: boolean) {
    this.productParameterService.showImage = value;
  }

  get listFilter(): string {
    return this.productParameterService.filterBy;
  }

  constructor(
    private productService: ProductService,
    private productParameterService: ProductParameterService
  ) {}

  ngOnInit(): void {
    //this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
    //this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';
    this.sub = this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        // Allows referencing the ViewChild property in ngOnInit and
        // Prevents the 'Expression has changed after it was checked' error
        setTimeout(() => {
          if (this.filterComponent) {
            this.filterComponent.listFilter =
              this.productParameterService.filterBy;
          }
        });
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  onValueChange(value: string): void {
    this.productParameterService.filterBy = value;
    this.performFilter(value);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter(
        (product) =>
          product
            .productName!.toLocaleLowerCase()
            .indexOf(filterBy.toLocaleLowerCase()) !== -1
      );
    } else {
      this.filteredProducts = this.products;
    }
  }
}
