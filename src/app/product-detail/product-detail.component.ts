import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, ProductResolved } from '../products/product';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private sub = new Subscription();

  pageTitle = 'Product Detail';
  product: IProduct | null = null;
  errorMessage = '';
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.sub.add(
      this.route.data.subscribe((data) => {
        const resolvedData: ProductResolved = data['resolvedData'];
        this.errorMessage = String(resolvedData.error);
        this.onProductRetrieved(resolvedData.product);
      })
    );

    //const resolvedData: ProductResolved =
    //this.route.snapshot.data['resolvedData'];

    // const id = Number(this.route.snapshot.paramMap.get('id'));
    // if (id) {
    //   this.getProduct(id);
    // }
    // this.pageTitle += `: ${id}`;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onProductRetrieved(product: IProduct | null): void {
    this.product = product;
    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }

  // getProduct(id: number): void {
  //   this.productService.getProduct(id).subscribe({
  //     next: (product) => (this.product = product),
  //     error: (err) => (this.errorMessage = err),
  //   });
  // }

  onBack(): void {
    this.router.navigate(['/products'], {
      queryParamsHandling: 'preserve',
      queryParams: { message: '' },
    });
  }
}
