import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  allStudentsReducer,
  allVolunteersReducer,
  userCreateReducer,
  studentDetailsReducer,
  userLoginReducer,
  userSignupReducer,
  userUpdateDetailsReducer,
  userUpdatePasswordReducer,
  volunteerDetailsReducer,
} from './reducers/userReducers';

import {
  createTransactionReducer,
  transactionDetailsReducer,
  transactionListReducer,
} from './reducers/transactionReducers';

const reducer = combineReducers({
  allStudents: allStudentsReducer,
  allVolunteers: allVolunteersReducer,
  userCreate: userCreateReducer,
  studentDetails: studentDetailsReducer,
  volunteerDetails: volunteerDetailsReducer,
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
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
