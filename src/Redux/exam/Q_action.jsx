import axios from "axios";
import {
  ADD_QUIZ_FAIL,
  ADD_QUIZ_REQ,
  ADD_QUIZ_SUCCESS,
  GET_QUIZ_FAIL,
  GET_QUIZ_REQ,
  GET_QUIZ_SUCCESS,
  UPLOAD_QUIZ_FAIL,
  UPLOAD_QUIZ_REQ,
  UPLOAD_QUIZ_SUCCESS,
} from "./Q_const";

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

export const addQuiz = (qData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_QUIZ_REQ });

    const configAddQuiz = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      "/api/quizes/create-quiz",
      qData,
      configAddQuiz
    );

    dispatch({ type: ADD_QUIZ_SUCCESS, payload: data.message });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_QUIZ_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const uploadQuiz = (qData) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_QUIZ_REQ });

    const { data } = await axios.post("/api/quizes/upload-quiz", qData, config);

    dispatch({ type: UPLOAD_QUIZ_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: UPLOAD_QUIZ_FAIL, payload: error.response.data.message });
  }
};
