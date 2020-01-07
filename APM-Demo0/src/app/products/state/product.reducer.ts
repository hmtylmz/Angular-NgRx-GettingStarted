import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as productState from './';

const initialState: productState.ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  errorMessage: ''
};

const getProductFeatureState = createFeatureSelector<productState.ProductState>('products');

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
  on(productState.ToggleProductCode, (state: productState.ProductState, { value }) => ({
    ...state,
    showProductCode: value
  })),
  on(productState.SetCurrentProduct, (state: productState.ProductState, { value }) => ({
    ...state,
    currentProductId: value
  })),
  on(productState.ClearCurrentProduct, (state: productState.ProductState) => ({
    ...state,
    currentProductId: null
  })),
  on(productState.InitializeCurrentProduct, (state: productState.ProductState) => ({
    ...state,
    currentProductId: 0
  }))
);
