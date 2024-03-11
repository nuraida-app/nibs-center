import {
  AUTH_FAIL,
  AUTH_REQ,
  AUTH_RESET,
  AUTH_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQ,
  LOAD_USER_SUCCESS,
} from "./auth_const";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_REQ:
    case LOAD_USER_REQ:
      return {
        ...state,
        isAuthenticated: false,
        isAuthLoading: true,
      };
    case AUTH_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isAuthLoading: false,
        user: action.payload,
        message: action.message,
      };

    case AUTH_FAIL:
    case LOAD_USER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        isAuthLoading: false,
        authError: action.payload,
      };

    case AUTH_RESET:
      return {
        ...state,
        isAuthenticated: false,
        isAuthLoading: false,
        authError: null,
        user: null,
      };
    default:
      return state;
  }
};
