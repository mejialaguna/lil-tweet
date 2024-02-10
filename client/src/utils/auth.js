import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";
import authReducer from "./authReducer";

const initialState = {
  user: null,
  isSnackBarOpen: false
};
if (localStorage.getItem("jwtToken")) {
  const token = jwtDecode(localStorage.getItem("jwtToken"));
  if (token.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = token;
  }
}

const AuthContext = createContext({});

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function openSnackBar(payload) {
    dispatch({
      type: "isSnackBarOpen",
      payload,
    });
  }

  function login(userData) {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
    openSnackBar(true);
  }

  function logout() {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
    openSnackBar(true);
  }

  return (
    <AuthContext.Provider
      value={{
       ...state,

      // methods
        login,
        logout,
        openSnackBar,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
