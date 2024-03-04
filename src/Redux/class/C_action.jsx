import axios from "axios";
import {
  ADD_CLASS_FAIL,
  ADD_CLASS_REQ,
  ADD_CLASS_SUCCESS,
  GET_CLASS_FAIL,
  GET_CLASS_REQ,
  GET_CLASS_SUCCESS,
} from "./C_const";

axios.defaults.baseURL = import.meta.env.VITE_BASE;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const getClasses = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CLASS_REQ });

    const { data } = await axios.get("/api/class/get-classes", config);

    dispatch({ type: GET_CLASS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CLASS_FAIL,
      payload: error.response.data || error.response.data.message,
    });
  }
};

export const addClass = (cData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CLASS_REQ });

    const { data } = await axios.post("/api/class/create-class", cData, config);

    dispatch({ type: ADD_CLASS_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: ADD_CLASS_FAIL,
      payload: error.response.data || error.response.data.message,
    });
  }
};
