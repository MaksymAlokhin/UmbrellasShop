import { Component, OnInit } from '@angular/core';

import { Customer } from './customer';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';

function emailMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailControl = control.get('email');
    const confirmControl = control.get('confirmEmail');

    if (emailControl?.pristine || confirmControl?.pristine) {
      return null;
    }
    if (emailControl?.value === confirmControl?.value) {
      return null;
    }
    return { match: true };
  };
}

function ratingRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (
      control.value !== null &&
      (isNaN(control.value) || control.value < min || control.value > max)
    ) {
      return { range: true };
    }
    return null;
  };
}

@Component({
  selector: 'um-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  customerForm!: FormGroup;
  customer = new Customer();
  emailMessage: string = '';

  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }

  private validationMessages: { [key: string]: string } = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.',
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      //lastName: { value: 'n/a', disabled: true},
      emailGroup: this.fb.group(
        {
          email: ['', [Validators.required, Validators.email]],
          confirmEmail: ['', Validators.required],
        },
        { validators: emailMatchValidator() }
      ),
      phone: '',
      notification: 'email',
      rating: [null, ratingRangeValidator(1, 5)],
      sendCatalog: true,
      addresses: this.fb.array([this.buildaddress()]),
    });

    this.customerForm
      .get('notification')
      ?.valueChanges.subscribe((value) => this.setNotification(value));

    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl?.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => this.setMessage(emailControl));
    // this.customerForm = new FormGroup({
    //   firstName: new FormControl(),
    //   lastName: new FormControl(),
    //   email: new FormControl(),
    //   sendCatalog: new FormControl(true),
    // });
  }

  addAddress(): void {
    this.addresses.push(this.buildaddress());
  }

  buildaddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
    });
  }

  populateTestData(): void {
    //setValue, patchValue
    this.customerForm.patchValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      emailGroup: { email: 'jack@torchwood.com' },
      sendCatalog: false,
    });
  }

  save(): void {
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors)
        .map(
          (key) =>
            this.validationMessages[key as keyof { [key: string]: string }]
        )
        .join(' ');
    }
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl!.setValidators(Validators.required);
    } else {
      phoneControl!.clearValidators();
    }
    phoneControl!.updateValueAndValidity();
  }
}
