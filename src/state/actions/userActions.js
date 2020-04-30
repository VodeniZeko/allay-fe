import axiosWithAuth from "../../utils/axiosWithAuth";
import {
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  BLOCK_USER_FAILURE,
  BLOCK_USER_START,
  BLOCK_USER_SUCCESS
} from "../types";

// ============ GET USER BY ID ===========

export const getUser = userId => dispatch => {
  dispatch({ type: FETCH_USER_START });
  return axiosWithAuth()
    .get(`/users/${userId}`)
    .then(res => {
      console.log("FETCH USER START", res.data);
      // dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_USER_FAILURE, payload: err });
    });
};

// ============ BLOCK USER ===========

export const blockUser = userId => dispatch => {
  dispatch({ type: BLOCK_USER_START });
  return axiosWithAuth()
    .put(`/users/${userId}/bind`)
    .then(res => {
      console.log("from blocking user", res.data);
      dispatch({ type: BLOCK_USER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: BLOCK_USER_FAILURE, payload: err });
    });
};