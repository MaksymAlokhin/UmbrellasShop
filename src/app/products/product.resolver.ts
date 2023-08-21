import { ResolveFn } from '@angular/router';
import { ProductService } from './product.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ProductResolved } from './product';

export const productResolver: ResolveFn<ProductResolved> = (route, state) => {
  const productService = inject(ProductService);
  const id = Number(route.paramMap.get('id'));
  if (isNaN(id)) {
    const message = `Product id was not a number: ${id}`;
    console.error(message);
    return of({ product: null, error: message });
  }

  return productService.getProduct(id)
    .pipe(
      map(product => ({ product, error: '' })),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        console.error(message);
        return of({ product: null, error: message });
      })
    );
};
