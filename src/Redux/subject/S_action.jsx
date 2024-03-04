import axios from "axios";
import {
  ADD_SUBJECT_FAIL,
  ADD_SUBJECT_REQ,
  ADD_SUBJECT_SUCCESS,
  GET_SUBJECTS_FAIL,
  GET_SUBJECTS_REQ,
  GET_SUBJECTS_SUCCESS,
} from "./S-Const";

axios.defaults.baseURL = import.meta.env.VITE_BASE;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const getSubjects = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SUBJECTS_REQ });

    const { data } = await axios.get("/api/subject/get-subjects", config);

    dispatch({ type: GET_SUBJECTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_SUBJECTS_FAIL, payload: error.message });
  }
};

export const addSubject = (sData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_SUBJECT_REQ });

    const { data } = await axios.post(
      "/api/subject/create-subject",
      sData,
      config
    );

    dispatch({ type: ADD_SUBJECT_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: ADD_SUBJECT_FAIL, payload: error.message });
  }
};
