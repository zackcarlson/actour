import { UPDATE_CREDITS } from "../constants";

export const updateCredits = (dispatch, credits) => {
  return dispatch({
    type: UPDATE_CREDITS,
    credits,
  });
};
