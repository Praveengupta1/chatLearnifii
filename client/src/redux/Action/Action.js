import { GET_ROOM, SET_USERNAME } from "../Type/Type";

// const loadingRoom = () => {
//   return {
//     type: LOADING_ROOM,
//   };
// };
// rrom

export const getRoom = () => {
  return {
    type: GET_ROOM,
  };
};

// user
export const setUser = (user) => {
  return {
    type: SET_USERNAME,
    payload: user,
  };
};
