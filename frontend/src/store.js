import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  allUsers,
  userDetailsReducer,
  userLoginReducer,
  userSignupReducer,
  userUpdateDetailsReducer,
  userUpdatePasswordReducer,
} from './reducers/userReducers';

import {
  createTransactionReducer,
  transactionDetailsReducer,
  transactionListReducer,
} from './reducers/transactionReducers';

const reducer = combineReducers({
  getUsers: allUsers,
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userDetails: userDetailsReducer,
  userUpdateDetails: userUpdateDetailsReducer,
  userUpdatePassword: userUpdatePasswordReducer,
  createTransaction: createTransactionReducer,
  transactionDetails: transactionDetailsReducer,
  transactionList: transactionListReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
