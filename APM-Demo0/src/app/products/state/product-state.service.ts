import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as productActions from '../state/product.actions';
import * as fromProducts from '../state/product.reducer';

@Injectable()
export class ProductStateService {

  constructor(private store: Store<fromProducts.State>) {

  }

  getCurrentProductId(): Observable<number> {
    return this.store.pipe(select(fromProducts.getCurrentProductId));
  }

  getShowProductCode(): Observable<boolean> {
    return this.store.pipe(select(fromProducts.getShowProductCode));
  }

  toggleProductCode(value: boolean): void {
    this.store.dispatch(productActions.ToggleProductCode({ value }));
  }

  setCurrentProduct(value: number): void {
    this.store.dispatch(productActions.SetCurrentProduct({ value }));
  }

  clearProductCode(): void {
    this.store.dispatch(productActions.ClearCurrentProduct());
  }

  initializeCurrentProduct(): void {
    this.store.dispatch(productActions.InitializeCurrentProduct());
  }
}
