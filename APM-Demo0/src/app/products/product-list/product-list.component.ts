import { Observable, of, Subscription } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { Product } from '../product';
import { ItemDataService } from '../state/item-data.service';
import { ProductStateService } from '../state/product-state.service';

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
    private productStateService: ProductStateService,
    private itemDataService: ItemDataService) { }

  ngOnInit(): void {
    this.productStateService.getCurrentProductId().pipe(
      switchMap((productId) => productId ? this.itemDataService.getByKey(productId) : of({
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      }))).subscribe(
        currentProduct => this.selectedProduct = currentProduct
      );

    this.products$ = this.itemDataService.entities$;
    this.itemDataService.getAll();

    this.productStateService.getShowProductCode().pipe(
      takeWhile(() => this.componentActive))
      .subscribe((showProductCode) => this.displayCode = showProductCode);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.productStateService.toggleProductCode(value);
  }

  newProduct(): void {
    this.productStateService.initializeCurrentProduct();
  }

  productSelected(product: Product): void {
    this.productStateService.setCurrentProduct(product.id);
  }

}
