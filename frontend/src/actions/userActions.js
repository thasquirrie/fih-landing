import axios from 'axios';
import {
  ADMIN_DETAILS_FAIL,
  ADMIN_DETAILS_REQUEST,
  ADMIN_DETAILS_SUCCESS,
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
  STUDENT_DETAILS_FAIL,
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_SUCCESS,
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
  VOLUNTEER_DETAILS_FAIL,
  VOLUNTEER_DETAILS_REQUEST,
  VOLUNTEER_DETAILS_SUCCESS,
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
      url: '/api/v1/users/login',
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
      url: '/api/v1/users/signup',
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

export const getStudentDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_DETAILS_REQUEST });

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
      url: `/api/v1/users/${id}`,
      headers,
    });

    console.log({ user });

    dispatch({
      type: STUDENT_DETAILS_SUCCESS,
      payload: user,
    });

    // localStorage.setItem('userInfo', JSON.stringify({ user, token }));
  } catch (error) {
    dispatch({
      type: STUDENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getVolunteersDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: VOLUNTEER_DETAILS_REQUEST });

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
      type: VOLUNTEER_DETAILS_SUCCESS,
      payload: { user, token },
    });

    // localStorage.setItem('userInfo', JSON.stringify({ user, token }));
  } catch (error) {
    dispatch({
      type: VOLUNTEER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMyDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_DETAILS_REQUEST });

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
        data: { admin },
        token,
      },
    } = await axios({
      method: 'GET',
      url: `/api/v1/users/me`,
      headers,
    });

    console.log({ admin, token });

    dispatch({
      type: ADMIN_DETAILS_SUCCESS,
      payload: admin,
    });

    // localStorage.setItem('userInfo', JSON.stringify({ user, token }));
  } catch (error) {
    dispatch({
      type: ADMIN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserDetails = (data) => async (dispatch, getState) => {
  try {
    console.log('HI');
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    // const config = {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    };
    // };

    console.log(data);

    const {
      data: {
        data: { admin },
        token,
      },
    } = await axios({
      method: 'PATCH',
      url: `/api/v1/users/update-me`,
      headers,
      data,
    });

    console.log({ admin });

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: admin,
    });

    localStorage.setItem('userInfo', JSON.stringify({ admin, token }));
  } catch (error) {
    console.log({ error });
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserPassword = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PASSWORD_REQUEST });

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
        data: { token },
      },
    } = await axios({
      method: 'PATCH',
      url: `/api/v1/users/update-password`,
      headers,
      data,
    });

    // console.log({ token });

    dispatch({
      type: USER_UPDATE_PASSWORD_SUCCESS,
      payload: token,
    });

    // localStorage.setItem('userInfo', JSON.stringify({ user, token }));
  } catch (error) {
    console.log(error);
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
      url: `/api/v1/users/volunteers`,
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
      url: `/api/v1/users/students`,
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
      url: `/api/v1/users/`,
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
