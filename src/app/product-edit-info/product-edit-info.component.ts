import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChildren,
  ElementRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControlName,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';

import { IProduct } from '../products/product';
import { ProductService } from '../products/product.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';
import { ValidationMessage } from '../shared/validation-message.type';
import { MessageService } from '../messages/message.service';

@Component({
  selector: 'um-product-edit-info',
  templateUrl: './product-edit-info.component.html',
  styleUrls: ['./product-edit-info.component.scss'],
})
export class ProductEditInfoComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  placeholderImage = 'assets/images/umbrellas/umbrella-placeholder.png';
  productForm!: FormGroup;

  product!: IProduct;
  private sub = new Subscription();

  // Use with the generic validation message class
  displayMessage: ValidationMessage = {};
  private validationMessages: { [key: string]: ValidationMessage };
  private genericValidator: GenericValidator;

  get tags(): FormArray {
    return this.productForm.get('tags') as FormArray;
  }

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.',
      },
      productCode: {
        required: 'Product code is required.',
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).',
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      description: '',
      imageUrl: '',
    });

    this.sub.add(
      this.productService.selectedProductChanges$
        .pipe(take(1))
        .subscribe((product) => {
          if (product) {
            this.displayProduct(product);
            if (!this.productForm.valid) {
              this.productForm.markAllAsTouched();
            }
            this.displayMessage = this.genericValidator.processMessages(
              this.productForm
            );
          }
        })
    );

    this.sub.add(
      this.productForm.valueChanges.subscribe((data) => {
        this.productService.changeValidation({
          infoTabValid: this.productForm.valid,
          infoTabDirty: this.productForm.dirty,
        });
        this.productService.changeSelectedProduct(data);

        // if (data && this.productForm.dirty && this.productForm.valid) {
        //   Object.assign(this.product, data);
        // }
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

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    if (this.formInputElements) {
      const controlBlurs: Observable<any>[] = this.formInputElements.map(
        (formControl: ElementRef) =>
          fromEvent(formControl.nativeElement, 'blur')
      );

      // Merge the blur event observable with the valueChanges observable
      // so we only need to subscribe once.
      merge(this.productForm.valueChanges, ...controlBlurs)
        .pipe(debounceTime(800))
        .subscribe((value) => {
          this.displayMessage = this.genericValidator.processMessages(
            this.productForm
          );
        });
    }
  }

  // getProduct(id: number): void {
  //   this.productService.getProduct(id).subscribe({
  //     next: (product: IProduct) => this.displayProduct(product),
  //     error: (err) => (this.errorMessage = err),
  //   });
  // }

  displayProduct(product: IProduct | null): void {
    if (this.productForm) {
      this.productForm.reset();
    }

    if (!product) {
      return;
    }

    this.product = product;

    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      description: this.product.description,
      imageUrl: this.placeholderImage,
    });
  }
}
