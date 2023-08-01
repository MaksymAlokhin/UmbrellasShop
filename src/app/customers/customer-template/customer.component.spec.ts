import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTemplateComponent } from './customer.component';

describe('CustomerComponent', () => {
  let component: CustomerTemplateComponent;
  let fixture: ComponentFixture<CustomerTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerTemplateComponent]
    });
    fixture = TestBed.createComponent(CustomerTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
