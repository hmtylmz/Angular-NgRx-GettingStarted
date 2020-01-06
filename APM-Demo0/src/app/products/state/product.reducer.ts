import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as fromRoot from '../../state/app.state';
import { Product } from '../product';
import * as productActions from '../state/product.actions';

export interface State extends fromRoot.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  errorMessage: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  errorMessage: ''
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const reducer = createReducer(
  initialState,
  on(productActions.ToggleProductCode, (state: ProductState, { value }) => ({
    ...state,
    showProductCode: value
  })),
  on(productActions.SetCurrentProduct, (state: ProductState, { value }) => ({
    ...state,
    currentProductId: value
  })),
  on(productActions.ClearCurrentProduct, (state: ProductState) => ({
    ...state,
    currentProductId: null
  })),
  on(productActions.InitializeCurrentProduct, (state: ProductState) => ({
    ...state,
    currentProductId: 0
  }))
);
