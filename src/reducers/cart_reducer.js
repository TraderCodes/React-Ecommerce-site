import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, product, amount } = action.payload;
    // if i.id === id+color that means the item is already in the cart
    const tempItem = state.cart.find((i) => i.id === id + color);
    if (tempItem) {
    } else {
      // setup new item
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.image[0].url,
        price: product.price,
        // set max so you know whats the max amount 
        max:product.stock
      };
      return { ...state, cart: { ...state.cart, newItem } };
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
