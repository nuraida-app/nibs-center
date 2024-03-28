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
  GET_STUDENT_ANSWER_FAIL,
  GET_STUDENT_ANSWER_REQ,
  GET_STUDENT_ANSWER_SUCCESS,
  UPDATE_ANSWER_FAIL,
  UPDATE_ANSWER_REQ,
  UPDATE_ANSWER_SUCCESS,
  get_scores_fail,
  get_scores_req,
  get_scores_success,
  give_score_fail,
  give_score_req,
  give_score_success,
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

export const getStudentsAnswers = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_STUDENT_ANSWER_REQ });

    const { data } = await axios.get(
      `/api/answers/students-answers/${id}`,
      config
    );

    dispatch({ type: GET_STUDENT_ANSWER_SUCCESS, answers: data });
  } catch (error) {
    dispatch({ type: GET_STUDENT_ANSWER_FAIL, error: error.message });
  }
};

export const giveScore = (answersId, score) => async (dispatch) => {
  try {
    dispatch({ type: give_score_req });

    const { data } = await axios.put(
      `/api/answers/update-answer-score/${answersId}`,
      score,
      config
    );

    dispatch({ type: give_score_success, message: data.message });
  } catch (error) {
    console.log(error);
    dispatch({ type: give_score_fail, error: error.message });
  }
};

export const getScores = (examId) => async (dispatch) => {
  try {
    dispatch({ type: get_scores_req });

    const { data } = await axios.get(
      `/api/answers/get-scores/${examId}`,
      config
    );

    dispatch({ type: get_scores_success, scores: data });
  } catch (error) {
    dispatch({ type: get_scores_fail, error: error.message });
  }
};
