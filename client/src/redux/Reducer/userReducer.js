import * as ACTION_TYPE from "../Type/Type";

const initailState = {
  loading: false,
  user: null,
  messages: null,
  groupmessages: null,
  error: false,
};

const userReducer = (state = initailState, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_USER_DATA:
      return {
        ...state,
        loading: true,
      };
    case ACTION_TYPE.FETCHING_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        messages: action.payload.messages,
        groupmessages: action.payload.groupmessages,
      };
    default:
      return state;
  }
};

export default userReducer;
