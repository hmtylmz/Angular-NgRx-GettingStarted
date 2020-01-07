import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as productState from './';

@Injectable()
export class ProductStateService {

  constructor(private store: Store<productState.State>) {

  }

  getCurrentProductId(): Observable<number> {
    return this.store.pipe(select(productState.getCurrentProductId));
  }

  getShowProductCode(): Observable<boolean> {
    return this.store.pipe(select(productState.getShowProductCode));
  }

  toggleProductCode(value: boolean): void {
    this.store.dispatch(productState.ToggleProductCode({ value }));
  }

  setCurrentProduct(value: number): void {
    this.store.dispatch(productState.SetCurrentProduct({ value }));
  }

  clearProductCode(): void {
    this.store.dispatch(productState.ClearCurrentProduct());
  }

  initializeCurrentProduct(): void {
    this.store.dispatch(productState.InitializeCurrentProduct());
  }
}
