import {
  AUTH_FAIL,
  AUTH_REQ,
  AUTH_RESET,
  AUTH_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQ,
  LOAD_USER_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_REQ,
  LOGOUT_RESET,
  LOGOUT_SUCCESS,
} from "./auth_const";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_REQ:
    case LOAD_USER_REQ:
    case LOGOUT_REQ:
      return {
        ...state,
        isAuthenticated: false,
        isAuthLoading: true,
        logoutLoading: true,
      };

    case AUTH_SUCCESS:
    case LOAD_USER_SUCCESS:
      localStorage.setItem("login", JSON.stringify("login"));

      return {
        ...state,
        isAuthenticated: true,
        isAuthLoading: false,
        isLogout: false,
        logoutLoading: false,
        user: action.payload,
        message: action.message,
      };

    case LOGOUT_SUCCESS:
      localStorage.removeItem("login");
      return {
        ...state,
        isAuthenticated: false,
        isAuthLoading: false,
        logoutLoading: false,
        user: null,
        message: null,
        isLogout: true,
        logout: action.logout,
      };

    case AUTH_FAIL:
    case LOAD_USER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        isAuthLoading: false,
        logoutLoading: false,
        authError: action.payload,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        isAuthLoading: false,
        logoutLoading: false,
        logoutError: action.error,
      };

    case AUTH_RESET:
    case LOGOUT_RESET:
      return {
        ...state,
        isAuthenticated: false,
        isAuthLoading: false,
        logoutLoading: false,
        authError: null,
        user: null,
      };
    default:
      return state;
  }
};
