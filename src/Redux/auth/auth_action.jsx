import axios from "axios";
import {
  AUTH_FAIL,
  AUTH_REQ,
  AUTH_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQ,
  LOAD_USER_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_REQ,
  LOGOUT_SUCCESS,
} from "./auth_const";

axios.defaults.baseURL = import.meta.env.VITE_BASE;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const auth = (userData) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_REQ });

    const { data } = await axios.post("/api/auth/login", userData, config);

    dispatch({
      type: AUTH_SUCCESS,
      message: data.message,
      payload: data.user,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: AUTH_FAIL, payload: error.response.data.message });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQ });

    const { data } = await axios.post("/api/auth/logout", config);

    dispatch({ type: LOGOUT_SUCCESS, logout: data.message });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, error: error.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQ });

    const { data } = await axios.get("/api/users/profile", config);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};
