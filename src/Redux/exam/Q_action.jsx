import axios from "axios";
import { GET_QUIZ_FAIL, GET_QUIZ_REQ, GET_QUIZ_SUCCESS } from "./Q_const";

axios.defaults.baseURL = import.meta.env.VITE_BASE;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const getQuizes = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_QUIZ_REQ });

    const { data } = await axios.get(`/api/quizes/exam/${id}`, config);

    dispatch({ type: GET_QUIZ_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_QUIZ_FAIL, payload: error.message });
  }
};
