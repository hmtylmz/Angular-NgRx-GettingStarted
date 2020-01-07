import * as fromRoot from '../../state/app.state';
import { Product } from '../product';

export interface State extends fromRoot.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  errorMessage: string;
}

export * from './product.actions';
export * from './product.reducer';
