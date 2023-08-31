import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { FormValidation, IProduct, ProductResolved } from '../products/product';
import { ProductService } from '../products/product.service';

import { ValidationMessage } from '../shared/validation-message.type';
import { MessageService } from '../messages/message.service';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit, OnDestroy {
  pageTitle = 'Product Edit';
  placeholderImage = 'assets/images/umbrellas/umbrella-placeholder.png';
  errorMessage: string = '';
  formValidation: FormValidation = {};
  private sub = new Subscription();

  // Use with the generic validation message class
  displayMessage: ValidationMessage = {};

  private currentProduct: IProduct | null = null;

  get product(): IProduct | null {
    return this.currentProduct;
  }
  set product(value: IProduct | null) {
    this.currentProduct = value;
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const resolvedData: ProductResolved =
      this.route.snapshot.data['resolvedData'];
    this.errorMessage = String(resolvedData.error);
    this.onProductRetrieved(resolvedData.product);
    // this.sub.add(
    //   this.route.data.subscribe((data) => {
    //     const resolvedData: ProductResolved = data['resolvedData'];
    //     this.errorMessage = String(resolvedData.error);
    //     this.onProductRetrieved(resolvedData.product);
    //   })
    // );
    this.sub.add(
      this.productService.selectedProductChanges$.subscribe((product) => {
        if (product) {
          this.product = product;
        }
      })
    );
    this.sub.add(
      this.productService.formValidSourceChanges$.subscribe((data) => {
        this.formValidation = data;
      })
    );

    // this.sub = this.route.paramMap.subscribe((params) => {
    //   const id = +params.get('id')!;
    //   this.getProduct(id);
    // });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // getProduct(id: number): void {
  //   this.productService.getProduct(id).subscribe({
  //     next: (product: IProduct) => this.displayProduct(product),
  //     error: (err) => (this.errorMessage = err),
  //   });
  // }

  onProductRetrieved(product: IProduct | null): void {
    this.productService.changeSelectedProduct(product);
    if (!product) {
      this.pageTitle = 'No product found';
      return;
    }

    if (product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${product.productName}`;
    }
  }

  deleteProduct(): void {
    if (this.product!.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${this.product!.productName}?`)) {
        this.productService.deleteProduct(this.product!.id!).subscribe({
          next: () => this.onSaveComplete(),
          error: (err: string) => (this.errorMessage = err),
        });
      }
    }
  }

  saveProduct(): void {
    if (this.product && this.isValid() && this.isDirty()) {
      this.sub.add(
        this.productService.saveProduct(this.product).subscribe({
          next: () =>
            this.onSaveComplete(`${this.product?.productName} was saved`),
          error: (err: string) => (this.errorMessage = err),
        })
      );
    } else {
      this.errorMessage = 'Please correct the validation errors.';
      const id = this.route.snapshot.paramMap.get('id');
      if (this.router.url.toString() === `/products/${id}/edit/tags`) {
        this.router.navigate([`/products/${id}/edit/info`]);
      }
    }
  }

  onSaveComplete(message?: string): void {
    this.productService.resetValidation();
    if (message) {
      this.messageService.addMessage(message);
    }

    this.router.navigate(['/products']);
  }

  isValid(path?: string): boolean {
    if (path) {
      switch (path) {
        case 'info':
          return this.formValidation.infoTabValid!;
        case 'tags':
          return this.formValidation.tagsTabValid!;
      }
    }

    return (
      this.formValidation.infoTabValid! && this.formValidation.tagsTabValid!
    );
  }

  isDirty(): boolean {
    return (
      this.formValidation.infoTabDirty! || this.formValidation.tagsTabDirty!
    );
  }
}
