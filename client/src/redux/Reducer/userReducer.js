import * as ACTION_TYPE from "../Type/Type";

const initailState = {
  loading: false,
  user: null,
  messages: [],
  groupmessages: [],
  error: false,
};

const userReducer = (state = initailState, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCHING_GROUP_MESSAGE: {
      let index = state.groupmessages.findIndex(
        (mess) => mess._id === action.payload._id
      );
      console.log(action.payload);
      console.log(index);
      state.groupmessages[index] = action.payload;
      let group = state.groupmessages;
      return {
        ...state,
        groupmessages: group,
      };
    }
    case ACTION_TYPE.FETCHING_MESSAGE: {
      let index = state.messages.findIndex(
        (mess) => mess._id === action.payload._id
      );

      state.messages[index] = action.payload;

      return {
        ...state,
        messages: state.messages,
      };
    }
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
