import { Injectable } from '@angular/core';
import { ProductService } from '../product.service';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductActionTypes, LoadSuccess, LoadFail } from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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
}
