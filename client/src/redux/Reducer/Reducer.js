import { LOADING_ROOM, GET_ROOM, SET_USERNAME } from "../Type/Type";
import { v4 as uuid } from "uuid";

const initailState = {
  rooms: [
    {
      id: 1,
      name: "Praveen",
    },
    {
      id: 2,
      name: "Shivam",
    },
    {
      id: 3,
      name: "Deepak",
    },
    {
      id: 4,
      name: "Sandeep",
    },
  ],
  loading: false,
  user: null,
};

const roomReducer = (state = initailState, action) => {
  switch (action.type) {
    case LOADING_ROOM:
      return {
        ...state,
        loading: true,
      };
    case GET_ROOM:
      return {
        ...state,
        loading: false,
      };
    case SET_USERNAME:
      return {
        ...state,
        user: action.payload,
        loading: true,
      };
    default:
      return state;
  }
};

export default roomReducer;
