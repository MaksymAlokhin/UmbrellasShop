import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Subscription, take } from 'rxjs';

import { IProduct } from '../products/product';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'um-product-edit-tags',
  templateUrl: './product-edit-tags.component.html',
  styleUrls: ['./product-edit-tags.component.scss'],
})
export class ProductEditTagsComponent implements OnInit, OnDestroy {
  formInputElements!: ElementRef[];

  pageTitle = 'Product Edit';
  placeholderImage = 'assets/images/umbrellas/umbrella-placeholder.png';
  productForm!: FormGroup;

  product!: IProduct;
  private sub = new Subscription();

  get tags(): FormArray {
    return this.productForm.get('tags') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      tags: this.fb.array([]),
    });

    this.sub.add(
      this.productForm.valueChanges.subscribe((data) => {
        this.productService.changeValidation({
          tagsTabValid: this.productForm.valid,
          tagsTabDirty: this.productForm.dirty,
        });
        this.productService.changeSelectedProduct(data);

        // if (data && this.productForm.dirty && this.productForm.valid) {
        //   Object.assign(this.product, data);
        // }
      })
    );

    this.getProduct();

    this.sub.add(
      this.productService.resetFormChanges$.subscribe((reset) => {
        if (reset) {
          this.productForm.reset();
          this.getProduct();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addTag(): void {
    this.productForm.markAsDirty();
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.productForm.markAsDirty();
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  getProduct(): void {
    this.sub.add(
      this.productService.selectedProductChanges$
        .pipe(take(1))
        .subscribe((product) => {
          if (product) {
            this.displayProduct(product);
          }
        })
    );
  }

  displayProduct(product: IProduct | null): void {
    this.product = product!;
    this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
  }
}
