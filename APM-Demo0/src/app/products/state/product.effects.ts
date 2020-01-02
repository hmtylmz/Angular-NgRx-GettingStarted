import { Injectable } from '@angular/core';
import { ProductService } from '../product.service';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductActionTypes, LoadSuccess, LoadFail, UpdateSuccess, UpdateFail, Update, Create, CreateSuccess, CreateFail } from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Product } from '../product';

@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private productService: ProductService) { }

  @Effect()
  loadProducts$ = this.actions$.pipe(
    ofType(ProductActionTypes.Load),
    mergeMap((action) =>
      this.productService.getProducts().pipe(
        map((products) => new LoadSuccess(products)),
        catchError((error) => of(new LoadFail(error)))
      )
    )
  );

  @Effect()
  updateProduct$ = this.actions$.pipe(
    ofType(ProductActionTypes.UpdateProduct),
    mergeMap((action: Update) =>
      this.productService.updateProduct(action.payload).pipe(
        map((updatedProduct) => new UpdateSuccess(updatedProduct)),
        catchError((error) => of(new UpdateFail(error)))
      )
    )
  );

  @Effect()
  createProduct$ = this.actions$.pipe(
    ofType(ProductActionTypes.CreateProduct),
    mergeMap((action: Create) =>
      this.productService.createProduct(action.payload).pipe(
        map((updatedProduct) => new CreateSuccess(updatedProduct)),
        catchError((error) => of(new CreateFail(error)))
      )
    )
  );
}
