import { combineReducers } from 'redux';
import cart from './product.reducer';
import registerUser from './user.reducer';
import userOrders from './sales.reducer';

const rootReducer = combineReducers({ cart, registerUser, userOrders });

export default rootReducer;
