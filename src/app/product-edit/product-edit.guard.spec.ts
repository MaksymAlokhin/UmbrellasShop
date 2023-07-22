import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { productEditGuard } from './product-edit.guard';

describe('productEditGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => productEditGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
