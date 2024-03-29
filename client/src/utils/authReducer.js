function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "isSnackBarOpen":
      return {
        ...state,
        isSnackBarOpen: action.payload,
      }
    default:
      return state;
  }
}

export default authReducer;
