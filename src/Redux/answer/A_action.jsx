import axios from "axios";

import {
  CREATE_ANSWER_FAIL,
  CREATE_ANSWER_REQ,
  CREATE_ANSWER_SUCCESS,
  GET_ANSWER_FAIL,
  GET_ANSWER_REQ,
  GET_ANSWER_SUCCESS,
  GET_MY_ANSWER_FAIL,
  GET_MY_ANSWER_REQ,
  GET_MY_ANSWER_SUCCESS,
  UPDATE_ANSWER_FAIL,
  UPDATE_ANSWER_REQ,
  UPDATE_ANSWER_SUCCESS,
} from "./A_const";

axios.defaults.baseURL = import.meta.env.VITE_BASE;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const createAnswer = (aData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ANSWER_REQ });

    const { data } = await axios.post(
      `/api/answers/create-answer`,
      aData,
      config
    );

    dispatch({ type: CREATE_ANSWER_SUCCESS, message: data.message });
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATE_ANSWER_FAIL, error: error.message });
  }
};

export const getAnswers = (examId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ANSWER_REQ });

    const { data } = await axios.get(
      `/api/answers/get-scores/${examId}`,
      config
    );

    dispatch({ type: GET_ANSWER_SUCCESS, answers: data });
  } catch (error) {
    dispatch({ type: GET_ANSWER_FAIL, error: error.message });
  }
};

export const getMyAnswer = (examId) => async (dispatch) => {
  try {
    dispatch({ type: GET_MY_ANSWER_REQ });

    const { data } = await axios.get(
      `/api/answers/get-my-answer/${examId}`,
      config
    );

    dispatch({ type: GET_MY_ANSWER_SUCCESS, answers: data });
  } catch (error) {
    dispatch({ type: GET_MY_ANSWER_FAIL, error: error.message });
  }
};

export const updateAnswer = (quizId, aData) => async (dispatch) => {
  try {
    dispatch({ tye: UPDATE_ANSWER_REQ });

    const { data } = await axios.put(
      `/api/answers/update-answer/${quizId}`,
      aData,
      config
    );

    dispatch({ type: UPDATE_ANSWER_SUCCESS, message: data.message });
  } catch (error) {
    dispatch({ type: UPDATE_ANSWER_FAIL, error: error.message });
  }
};
