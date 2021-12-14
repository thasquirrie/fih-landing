import axios from 'axios';
import {
 USER_DETAILS_FAIL,
 USER_DETAILS_REQUEST,
 USER_DETAILS_RESET,
 USER_DETAILS_SUCCESS,
 USER_LOGIN_FAIL,
 USER_LOGIN_REQUEST,
 USER_LOGIN_SUCCESS,
 USER_LOGOUT,
 USER_SIGNUP_FAIL,
 USER_SIGNUP_REQUEST,
 USER_SIGNUP_SUCCESS,
 USER_UPDATE_FAIL,
 USER_UPDATE_REQUEST,
 USER_UPDATE_SUCCESS,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
 try {
  dispatch({ type: USER_LOGIN_REQUEST });

  const config = {
   headers: {
    'Content-Type': 'application/json',
   },
  };
  const {
   data: {
    data: { user },
    token,
   },
  } = await axios({
   method: 'POST',
   url: '/api/v1/users/login',
   data: { email, password },
   config,
  });

  dispatch({
   type: USER_LOGIN_SUCCESS,
   payload: { user, token },
  });

  localStorage.setItem('userInfo', JSON.stringify({ user, token }));
 } catch (error) {
  dispatch({
   type: USER_LOGIN_FAIL,
   payload:
    error.response && error.response.data.message
     ? error.response.data.message
     : error.message,
  });
 }
};

export const logout = () => (dispatch) => {
 localStorage.removeItem('userInfo');
 localStorage.removeItem('token');
 dispatch({ type: USER_LOGOUT });
 dispatch({ type: USER_DETAILS_RESET });
};

export const signup = (data) => async (dispatch) => {
 try {
  dispatch({ type: USER_SIGNUP_REQUEST });

  const config = {
   headers: {
    'Content-Type': 'application/json',
   },
  };
  const {
   data: {
    data: { user },
    token,
   },
  } = await axios({
   method: 'POST',
   url: '/api/v1/users/signup',
   data,
   config,
  });

  dispatch({
   type: USER_SIGNUP_SUCCESS,
   payload: { user, token },
  });

  localStorage.setItem('userInfo', JSON.stringify({ user, token }));
 } catch (error) {
  dispatch({
   type: USER_SIGNUP_FAIL,
   payload:
    error.response && error.response.data.message
     ? error.response.data.message
     : error.message,
  });
 }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
 try {
  dispatch({ type: USER_DETAILS_REQUEST });

  const {
   userLogin: { userInfo },
  } = getState();

  // const config = {
  const headers = {
   'Content-Type': 'application/json',
   Authorization: `Bearer ${userInfo.token}`,
  };
  // };

  const {
   data: {
    data: { user },
    token,
   },
  } = await axios({
   method: 'GET',
   url: `/api/v1/users/${id}`,
   headers,
  });

  dispatch({
   type: USER_DETAILS_SUCCESS,
   payload: { user, token },
  });

  localStorage.setItem('userInfo', JSON.stringify({ user, token }));
 } catch (error) {
  dispatch({
   type: USER_DETAILS_FAIL,
   payload:
    error.response && error.response.data.message
     ? error.response.data.message
     : error.message,
  });
 }
};

export const getMyDetails = () => async (dispatch, getState) => {
 try {
  dispatch({ type: USER_DETAILS_REQUEST });

  const {
   userLogin: { userInfo },
  } = getState();

  // const config = {
  const headers = {
   'Content-Type': 'application/json',
   Authorization: `Bearer ${userInfo.token}`,
  };
  // };

  const {
   data: {
    data: { user },
   },
  } = await axios({
   method: 'GET',
   url: `/api/v1/users/me`,
   headers,
  });

  dispatch({
   type: USER_DETAILS_SUCCESS,
   payload: user,
  });

  // localStorage.setItem('userInfo', JSON.stringify({ user, token }));
 } catch (error) {
  dispatch({
   type: USER_DETAILS_FAIL,
   payload:
    error.response && error.response.data.message
     ? error.response.data.message
     : error.message,
  });
 }
};

export const userUpdateDetails = (data) => async (dispatch, getState) => {
 try {
  console.log('HI');
  dispatch({ type: USER_UPDATE_REQUEST });

  const {
   userLogin: { userInfo },
  } = getState();

  // const config = {
  const headers = {
   'Content-Type': 'multipart/form-data',
   Authorization: `Bearer ${userInfo.token}`,
  };
  // };

  console.log(data);

  const {
   data: {
    data: { user },
   },
  } = await axios({
   method: 'PATCH',
   url: `/api/v1/users/update-me`,
   headers,
   data,
  });

  console.log({ user });

  dispatch({
   type: USER_UPDATE_SUCCESS,
   payload: user,
  });

  // localStorage.setItem('userInfo', JSON.stringify({ user, token }));
 } catch (error) {
  dispatch({
   type: USER_UPDATE_FAIL,
   payload:
    error.response && error.response.data.message
     ? error.response.data.message
     : error.message,
  });
 }
};
