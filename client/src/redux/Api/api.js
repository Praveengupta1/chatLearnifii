import { fetchDataAndProceed } from "../../config/utils";
import { METHOD_TYPES } from "../../config/constants";

export const loginUser = (data, callback) => {
  console.log(data);
  return fetchDataAndProceed("/user", METHOD_TYPES.POST, data, callback);
};
