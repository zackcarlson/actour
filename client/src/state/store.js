import React, { useReducer } from "react";
import { CreditsContext } from "./context";
import { CreditsReducer } from "./reducers/credits.js";

const Store = (props) => {
  const { children, initialValue } = props;
  const initialState = CreditsReducer(initialValue, { type: "__INIT__" });
  const [state, dispatch] = useReducer(CreditsReducer, initialState);

  return (
    <CreditsContext.Provider value={[state, dispatch]}>
      {children}
    </CreditsContext.Provider>
  );
};

export default Store;
