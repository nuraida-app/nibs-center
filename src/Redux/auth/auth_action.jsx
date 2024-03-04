import axios from "axios";
import {
  AUTH_FAIL,
  AUTH_REQ,
  AUTH_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQ,
  LOAD_USER_SUCCESS,
} from "./auth_const";

axios.defaults.baseURL = import.meta.env.VITE_BASE;

export const auth = (userData) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post("/api/auth/login", userData, config);

    dispatch({
      type: AUTH_SUCCESS,
      message: data.message,
      payload: data.user,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: AUTH_FAIL, payload: error.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.get("/api/users/profile", config);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOAD_USER_FAIL, payload: error.message });
  }
};
