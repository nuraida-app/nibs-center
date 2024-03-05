import axios from "axios";
import {
  ADD_EXAM_FAIL,
  ADD_EXAM_REQ,
  ADD_EXAM_SUCCESS,
  DETAIL_EXAM_FAIL,
  DETAIL_EXAM_REQ,
  DETAIL_EXAM_SUCCESS,
  GET_EXAM_FAIL,
  GET_EXAM_REQ,
  GET_EXAM_SUCCESS,
} from "./E_const";

axios.defaults.baseURL = import.meta.env.VITE_BASE;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

// SHOW ALL EXAMS
export const getExams = () => async (dispatch) => {
  try {
    dispatch({ type: GET_EXAM_REQ });

    const { data } = await axios.get("/api/exams/show-exams", config);

    dispatch({ type: GET_EXAM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_EXAM_FAIL, payload: error.message });
  }
};

// DETAIL EXAM
export const getDetailExam = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_EXAM_REQ });

    const { data } = await axios.get(`/api/exams/${id}`, config);

    dispatch({ type: DETAIL_EXAM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DETAIL_EXAM_FAIL, payload: error.message });
  }
};

// ADD EXAM
export const addExam = (eData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_EXAM_REQ });

    const { data } = await axios.post("/api/exams/create-exam", eData, config);

    dispatch({ type: ADD_EXAM_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: ADD_EXAM_FAIL,
      payload: error.message || error.response.data.message,
    });
  }
};
