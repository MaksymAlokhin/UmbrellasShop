import { CanDeactivateFn } from '@angular/router';
import { ProductEditComponent } from './product-edit.component';

export const productEditGuard: CanDeactivateFn<ProductEditComponent> = (component, currentRoute, currentState, nextState) => {
  if (component.isDirty() && component.isValid()) {
    const productName = component.product?.productName || 'New Product';
    return confirm(`Navigate away and lose all changes to ${productName}?`);
  }
  return true;
};
