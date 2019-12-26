import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as fromProducts from '../state/product.reducer';
import * as productActions from '../state/product.actions';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  componentActive = true;
  pageTitle = 'Products';

  displayCode: boolean;

  products$: Observable<Product[]>;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  errorMessage$: Observable<string>;

  constructor(
    private store: Store<fromProducts.State>) { }

  ngOnInit(): void {
    this.store.pipe(select(fromProducts.getCurrentProduct),
      takeWhile(() => this.componentActive)).subscribe(
        currentProduct => this.selectedProduct = currentProduct
      );

    this.errorMessage$ = this.store.pipe(select(fromProducts.getErrorMessage));
    this.products$ = this.store.pipe(select(fromProducts.getProducts));

    this.store.dispatch(new productActions.Load());

    this.store.pipe(select(fromProducts.getShowProductCode),
      takeWhile(() => this.componentActive))
      .subscribe((showProductCode) => this.displayCode = showProductCode);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

}
