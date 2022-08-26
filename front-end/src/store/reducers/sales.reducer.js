import { SET_USER_ORDERS } from '../actions/sales.action';

const INITIAL_STATE = [];

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_ORDERS:
    return action.payload;
  default:
    return state;
  }
};

export default userReducer;
