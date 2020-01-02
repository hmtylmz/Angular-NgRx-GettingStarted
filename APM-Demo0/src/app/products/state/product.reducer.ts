import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.actions';

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

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      }
    }
    return currentProductId ? state.products.find((product) => product.id === currentProductId) : null;
  }
);

export const getErrorMessage = createSelector(
  getProductFeatureState,
  state => state.errorMessage
);

export function reducer(state: ProductState = initialState, action: ProductActions): ProductState {
  switch (action.type) {

    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };

    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProductId: action.payload
      };

    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProductId: null
      };

    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProductId: 0
      };

    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: [...action.payload],
        errorMessage: ''
      };

    case ProductActionTypes.LoadFail:
      return {
        ...state,
        products: [],
        errorMessage: action.payload
      };

    case ProductActionTypes.UpdateProductSuccess:
      const updatedProducts = state.products
        .map((item: Product) => item.id === action.payload.id ? action.payload : item);
      return {
        ...state,
        products: [...updatedProducts],
        currentProductId: action.payload.id,
        errorMessage: ''
      };

    case ProductActionTypes.UpdateProductFail:
      return {
        ...state,
        errorMessage: action.payload
      };

    case ProductActionTypes.CreateProductSuccess:
      return {
        ...state,
        products: [action.payload, ...state.products],
        currentProductId: action.payload.id,
        errorMessage: ''
      };

    case ProductActionTypes.CreateProductFail:
      return {
        ...state,
        errorMessage: action.payload
      };

    default:
      return state;
  }
}
