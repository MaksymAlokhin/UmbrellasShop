import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { productResolver } from './product.resolver';
import { ProductResolved } from './product';

describe('productResolver', () => {
  const executeResolver: ResolveFn<ProductResolved> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => productResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
