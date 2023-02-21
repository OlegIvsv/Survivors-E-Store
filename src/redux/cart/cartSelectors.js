import { createSelector } from 'reselect';

export const cartItemsSelector = (state) => state.cart.items;

export const cartStatusSelector = (state) => state.cart.status;

export const cartErrorSelector = (state) => state.cart.error

export const cartItemCountSelector = createSelector(
  [cartItemsSelector],
  (items) => items?.reduce((total, next) => total + next.itemQuantity, 0) ?? 0
);