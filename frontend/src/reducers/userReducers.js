import {
  ADMIN_DETAILS_FAIL,
  ADMIN_DETAILS_REQUEST,
  ADMIN_DETAILS_RESET,
  ADMIN_DETAILS_SUCCESS,
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  GET_STUDENTS_FAIL,
  GET_STUDENTS_REQUEST,
  GET_STUDENTS_SUCCESS,
  GET_VOLUNTEERS_FAIL,
  GET_VOLUNTEERS_REQUEST,
  GET_VOLUNTEERS_SUCCESS,
  STUDENT_DETAILS_FAIL,
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_RESET,
  STUDENT_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESET,
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
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
  VOLUNTEER_DETAILS_FAIL,
  VOLUNTEER_DETAILS_REQUEST,
  VOLUNTEER_DETAILS_RESET,
  VOLUNTEER_DETAILS_SUCCESS,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    case USER_LOGIN_RESET:
      return {};
    default:
      return state;
  }
};

export const userSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const studentDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case STUDENT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case STUDENT_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case STUDENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const volunteerDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case VOLUNTEER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case VOLUNTEER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case VOLUNTEER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case VOLUNTEER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const adminDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ADMIN_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ADMIN_DETAILS_SUCCESS:
      return { loading: false, admin: action.payload };
    case ADMIN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, admin: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdatePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PASSWORD_REQUEST:
      return { loading: true };
    case USER_UPDATE_PASSWORD_SUCCESS:
      return { loading: false, admin: action.payload };
    case USER_UPDATE_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const allStudentsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_STUDENTS_REQUEST:
      return { loading: true };
    case GET_STUDENTS_SUCCESS:
      return { loading: false, success: true, students: action.payload };
    case GET_STUDENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return [];
  }
};

export const allVolunteersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_VOLUNTEERS_REQUEST:
      return { loading: true };
    case GET_VOLUNTEERS_SUCCESS:
      return { loading: false, success: true, volunteers: action.payload };
    case GET_VOLUNTEERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return [];
  }
};

export const userCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return { loading: true };
    case CREATE_USER_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case CREATE_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
