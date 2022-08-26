import { SET_USER } from '../actions/user.action';

const INITIAL_STATE = false;

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER:
    return action.payload;
  default:
    return state;
  }
};

export default userReducer;
