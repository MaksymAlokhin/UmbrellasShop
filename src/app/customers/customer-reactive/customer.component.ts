import { Component, OnInit } from '@angular/core';

import { Customer } from './customer';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

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
    });
    // this.customerForm = new FormGroup({
    //   firstName: new FormControl(),
    //   lastName: new FormControl(),
    //   email: new FormControl(),
    //   sendCatalog: new FormControl(true),
    // });
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
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  setNotification(notifyVia: string): void {
    //console.log(this.customerForm);

    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl!.setValidators(Validators.required);
    } else {
      phoneControl!.clearValidators();
    }
    phoneControl!.updateValueAndValidity();
  }
}
