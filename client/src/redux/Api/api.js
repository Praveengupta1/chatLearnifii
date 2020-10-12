import { fetchDataAndProceed } from "../../config/utils";
import { METHOD_TYPES } from "../../config/constants";

export const loginUser = (data, callback) => {
  console.log(data);
  return fetchDataAndProceed("user", METHOD_TYPES.POST, data, callback);
};

export const message = (data, callback) => {
  console.log(data);
  return fetchDataAndProceed(
    `message/${data.id}`,
    METHOD_TYPES.GET,
    data,
    callback
  );
};
