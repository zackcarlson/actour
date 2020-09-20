import { UPDATE_CREDITS } from "../constants";
import { getCachedCredits } from "../../utils";
const initialState = {
  credits: getCachedCredits() || [],
};

const CreditsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CREDITS:
      return { ...state, credits: [...action.credits.getCredits] };
    default:
      return state;
  }
};

export { CreditsReducer };
