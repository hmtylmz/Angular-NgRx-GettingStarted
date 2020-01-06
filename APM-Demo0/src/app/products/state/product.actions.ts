import { createAction, props } from '@ngrx/store';

export const ToggleProductCode = createAction(
  '[Product] Toggle Product Code',
  props<{ value: boolean }>()
);

export const SetCurrentProduct = createAction(
  '[Product] Set Current Product',
  props<{ value: number }>()
);

export const ClearCurrentProduct = createAction(
  '[Product] Clear Current Product'
);

export const InitializeCurrentProduct = createAction(
  '[Product] Initialize Current Product'
);
