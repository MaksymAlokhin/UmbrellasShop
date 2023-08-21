import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Customer } from './customer';


@Component({
  selector: 'um-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerTemplateComponent implements OnInit {
  customer = new Customer();

  constructor() { }

  ngOnInit(): void {
  }

  save(customerForm: NgForm): void {
    console.log('Saved: ' + JSON.stringify(customerForm.value));
  }
}
