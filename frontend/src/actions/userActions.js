import axios from 'axios';
import {
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  GET_STUDENTS_FAIL,
  GET_STUDENTS_REQUEST,
  GET_STUDENTS_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_VOLUNTEERS_FAIL,
  GET_VOLUNTEERS_REQUEST,
  GET_VOLUNTEERS_SUCCESS,
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
  USER_UPDATE_PASSWORD_FAIL,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants';

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    console.log({ data });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const {
      data: {
        data: { admin },
        token,
      },
    } = await axios({
      method: 'POST',
      url: 'http://localhost:4000/api/v1/users/login',
      data,
      config,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { admin, token },
    });

    localStorage.setItem('userInfo', JSON.stringify({ admin, token }));
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
  console.log({ data });
  try {
    dispatch({ type: USER_SIGNUP_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const {
      data: {
        data: { admin },
        token,
      },
    } = await axios({
      method: 'POST',
      url: 'http://localhost:4000/api/v1/users/signup',
      data,
      config,
    });

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: { admin, token },
    });

    localStorage.setItem('userInfo', JSON.stringify({ admin, token }));
  } catch (error) {
    console.log({ error });
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
      url: `http://localhost:4000/api/v1/users/${id}`,
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
      url: `http://localhost:4000/api/v1/users/me`,
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
        data: { admin },
      },
    } = await axios({
      method: 'PATCH',
      url: `localhost:4000/api/v1/users/update-me`,
      headers,
      data,
    });

    console.log({ admin });

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: admin,
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

export const userUpdatePassword = (data) => async (dispatch, getState) => {
  try {
    console.log('HI');
    dispatch({ type: USER_UPDATE_PASSWORD_REQUEST });

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
        data: { admin },
      },
    } = await axios({
      method: 'PATCH',
      url: `http://localhost:4000/api/v1/users/update-password`,
      headers,
      data,
    });

    console.log({ admin });

    dispatch({
      type: USER_UPDATE_PASSWORD_SUCCESS,
      payload: admin,
    });

    // localStorage.setItem('userInfo', JSON.stringify({ user, token }));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllVolunteers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_VOLUNTEERS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    // const config = {
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${userInfo.token}`,
    };
    // };

    const {
      data: {
        data: { users: volunteers },
      },
    } = await axios({
      method: 'GET',
      url: `http://localhost:4000/api/v1/users/volunteers`,
      headers,
    });

    console.log({ volunteers });

    dispatch({
      type: GET_VOLUNTEERS_SUCCESS,
      payload: volunteers,
    });

    // localStorage.setItem('userInfo', JSON.stringify({ user, token }));
  } catch (error) {
    dispatch({
      type: GET_VOLUNTEERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllStudents = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_STUDENTS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    // const config = {
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${userInfo.token}`,
    };
    // };

    const {
      data: {
        data: { users: students },
      },
    } = await axios({
      method: 'GET',
      url: `http://localhost:4000/api/v1/users/students`,
      headers,
    });

    console.log({ students });

    dispatch({
      type: GET_STUDENTS_SUCCESS,
      payload: students,
    });

    // localStorage.setItem('userInfo', JSON.stringify({ user, token }));
  } catch (error) {
    dispatch({
      type: GET_STUDENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createUser = (data) => async (dispatch, getState) => {
  try {
    console.log('HI');
    dispatch({ type: CREATE_USER_REQUEST });

    // const config = {
    const headers = {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${userInfo.token}`,
    };
    // };

    console.log(data);

    const {
      data: {
        data: { user },
      },
    } = await axios({
      method: 'POST',
      url: `http://localhost:4000/api/v1/users/`,
      headers,
      data,
    });

    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: user,
    });

    // localStorage.setItem('userInfo', JSON.stringify({ user, token }));
  } catch (error) {
    dispatch({
      type: CREATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
