import axios from 'axios';
import {
  CREATE_TRANSACTION_FAIL,
  CREATE_TRANSACTION_REQUEST,
  CREATE_TRANSACTION_SUCCESS,
  TRANSACTION_LIST_FAIL,
  TRANSACTION_LIST_REQUEST,
  TRANSACTION_LIST_SUCCESS,
} from '../constants/transactionConstants';

export const addTransaction = (data) => async (dispatch, getState) => {
  console.log({ data });
  try {
    dispatch({ type: CREATE_TRANSACTION_REQUEST });

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const {
      data: {
        data: { transaction },
      },
    } = await axios({
      method: 'POST',
      url: '/api/v1/transactions',
      data,
      headers,
    });

    console.log(transaction);

    dispatch({
      type: CREATE_TRANSACTION_SUCCESS,
      payload: transaction,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_TRANSACTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTransactions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TRANSACTION_LIST_REQUEST });

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const {
      data: {
        data: { transactions },
      },
    } = await axios({
      method: 'GET',
      url: '/api/v1/transactions',
      headers,
    });

    console.log(transactions);

    dispatch({
      type: TRANSACTION_LIST_SUCCESS,
      payload: transactions,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: TRANSACTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
