import { SET_CART } from '../actions/product.action';

const INITIAL_STATE = '';

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CART:
    return action.payload;
  default:
    return state;
  }
};

export default productReducer;
