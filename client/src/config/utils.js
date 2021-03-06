import axios from "axios";
import { message } from "antd";

import { METHOD_TYPES } from "./constants";
import { BASE_URL } from "./urls";

function getHeaders(headerData) {
  let token = localStorage.getItem("vyoriusUserAuth");
  // user = user && (user != 'undefined') ? JSON.parse(localStorage.getItem("weaverseUserAuth")) : null;
  // console.log("headers ====>>> ", token);
  let headers = "";
  if (!token && !headerData) {
    headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      //"x-access-token": token,
    };
    //headers.authorization = `bearer ${token}`;
    // console.log("headersheaders11111111111111", headers)
  }
  if (headerData) {
    headers = {
      "content-type": "multipart/form-data",
      //Accept: "application/json",
      "x-access-token": token,
    };
    //headers.authorization = `bearer ${token}`;
    // headers = { ...headers, ...headerData };
    // console.log("headersheaders", headers)
  }
  return headers;
  // console.log('header with token =>>', headers)
}

export function fetchDataAndProceed(url, method, data, callback, headerData) {
  const base_url = BASE_URL;
  // if (url.includes('/users') && BASE_URL_USERS) {
  //     base_url = BASE_URL_USERS;
  // }

  axios({
    method: method,
    params: method === METHOD_TYPES.GET ? data : {},
    data: method !== METHOD_TYPES.GET ? data : {},
    url: url,
    baseURL: base_url,
    headers: getHeaders(headerData),

    validateStatus: function (status) {
      return (status >= 200 && status < 300) || status === 412;
    },
  })
    .then((response) => {
      callback(false, response.data);
    })
    .catch((error) => {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        showMessage("error", error.response.data.message);
        callback(true, error);
      }
      // if (error && error.response && error.response.status === 401) {
      //     store.dispatch({ type: RESET_REDUX_STATE });
      // }
      else {
        callback(
          true,
          error.response && error.response.data
            ? error.response.data
            : error.response
        );
      }
    });
}

export function showMessage(type, msg, time, onClose) {
  const Message = message[type];
  Message(msg, time, onClose);
}

export const handletime = (time) => {
  let hour = new Date(time).getHours();
  let minute = new Date(time).getMinutes();
  let type = "am";
  if (hour > 12) {
    hour = hour - 12;
    type = "pm";
  }

  return `${hour}:${minute}${type}`;
};
let returnDate = null;
export const handleDate = (time) => {
  let date = new Date(time).getDate();
  let month = new Date(time).getMonth();
  let year = new Date(time).getFullYear();
  let Currentdate = new Date().getDate();
  let Currentmonth = new Date().getMonth();
  let Currentyear = new Date().getFullYear();
  
  if (!returnDate || returnDate !== `${date}/${month}/${year}`) {
    if (
      date === Currentdate &&
      month === Currentmonth &&
      year === Currentyear
    ) {
      returnDate = `${date}/${month}/${year}`;
      return "Today";
    } else if (
      date === Currentdate - 1 &&
      month === Currentmonth &&
      year === Currentyear
    ) {
      returnDate = `${date}/${month}/${year}`;
      return "YesterDay";
    } else {
      returnDate = `${date}/${month}/${year}`;
      return `${date}/${month}/${year}`;
    }
  } else {
    return null;
  }
};
