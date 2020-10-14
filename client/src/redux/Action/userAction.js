import * as API from "../Api/api";
import { showMessage } from "../../config/utils";
import * as ACTION_TYPE from "../Type/Type";

export const loginUser = (payload, callback) => {
  return function (dispatch) {
    payload = { ...payload };
    API.loginUser(payload, (error, response) => {
      dispatch({ type: ACTION_TYPE.FETCH_USER_DATA });

      if (!error) {
        if (response.statuscode === 403) {
          showMessage("error", "unsucessfully login check your id ", 5);
          dispatch({
            type: ACTION_TYPE.FETCHING_USER_FAILED,
            payload: response,
          });
        } else {
          showMessage("success", "now successfully login ", 5);
          dispatch({
            type: ACTION_TYPE.FETCHING_USER_SUCCESS,
            payload: response,
          });
        }
      }
      if (error) {
        showMessage("error", "unsucessfully login check your id ", 5);
        dispatch({
          type: ACTION_TYPE.FETCHING_USER_FAILED,
          payload: response,
        });
      }
    });
  };
};

export const updatemessage = (payload) => (dispatch) => {
  dispatch({
    type: ACTION_TYPE.FETCHING_MESSAGE,
    payload: payload.message,
  });
};

export const updategroupmessage = (payload) => (dispatch) => {
  dispatch({
    type: ACTION_TYPE.FETCHING_GROUP_MESSAGE,
    payload: payload,
  });
};
