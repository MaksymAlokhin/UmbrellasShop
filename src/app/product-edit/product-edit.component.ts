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
  FormControl,
  FormArray,
  Validators,
  FormControlName,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { IProduct, ProductResolved } from '../products/product';
import { ProductService } from '../products/product.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';
import { ValidationMessage } from '../shared/validation-message.type';
import { MessageService } from '../messages/message.service';

@Component({
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  pageTitle = 'Product Edit';
  placeholderImage = 'assets/images/umbrellas/umbrella-placeholder.png';
  errorMessage: string = '';
  productForm!: FormGroup;

  product!: IProduct;
  private sub!: Subscription;

  // Use with the generic validation message class
  displayMessage: ValidationMessage = {};
  private validationMessages: { [key: string]: ValidationMessage };
  private genericValidator: GenericValidator;

  get tags(): FormArray {
    return this.productForm.get('tags') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private messageService: MessageService
  ) {
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
      tags: this.fb.array([]),
      description: '',
      imageUrl: '',
    });

    this.route.data.subscribe((data) => {
      const resolvedData: ProductResolved = data['resolvedData'];
      this.errorMessage = String(resolvedData.error);
      this.displayProduct(resolvedData.product);
    });

    // this.sub = this.route.paramMap.subscribe((params) => {
    //   const id = +params.get('id')!;
    //   this.getProduct(id);
    // });
  }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
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

  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
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
      this.pageTitle = 'No product found';
      return;
    }

    this.product = product;

    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }

    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      description: this.product.description,
      imageUrl: this.placeholderImage,
    });
    this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id!).subscribe({
          next: () => this.onSaveComplete(),
          error: (err: string) => (this.errorMessage = err),
        });
      }
    }
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        const p = { ...this.product, ...this.productForm.value };

        this.productService.saveProduct(p).subscribe({
          next: () => this.onSaveComplete(`The new ${this.product?.productName} was saved`),
          error: (err: string) => (this.errorMessage = err),
        });
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }
    // Reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate(['/products']);
  }
}
