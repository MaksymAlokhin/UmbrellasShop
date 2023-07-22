import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../products/product';
import { ProductService } from '../products/product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: IProduct | undefined;
  errorMessage = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getProduct(id);
    }
    this.pageTitle += `: ${id}`;
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: (product) => (this.product = product),
      error: (err) => (this.errorMessage = err),
    });
  }
  
  onBack(): void {
    this.router.navigate(['/products']);
  }
}
