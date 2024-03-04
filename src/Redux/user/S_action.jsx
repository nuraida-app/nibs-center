import axios from "axios";
import {
  ADD_STUDENT_FAIL,
  ADD_STUDENT_REQ,
  ADD_STUDENT_SUCCESS,
  STUDENTS_GET_FAIL,
  STUDENTS_GET_REQ,
  STUDENTS_GET_SUCCESS,
  UPLOAD_STUDENTS_FAIL,
  UPLOAD_STUDENTS_REQ,
  UPLOAD_STUDENTS_SUCCESS,
} from "./S_const";

axios.defaults.baseURL = import.meta.env.VITE_BASE;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const getStudents = () => async (dispatch) => {
  try {
    dispatch({ type: STUDENTS_GET_REQ });

    const { data } = await axios.get("/api/users/get-students", config);

    dispatch({ type: STUDENTS_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: STUDENTS_GET_FAIL, payload: error.message });
  }
};

export const addStudent = (sData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_STUDENT_REQ });

    const { data } = await axios.post("/api/users/create-user", sData, config);

    dispatch({ type: ADD_STUDENT_SUCCESS, payload: data.message });
  } catch (error) {
    console.log(error);
    dispatch({ type: ADD_STUDENT_FAIL, payload: error.response.data.message });
  }
};

export const uploadStudents = (sData) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_STUDENTS_REQ });

    const { data } = await axios.post(
      "/api/users/upload-students",
      sData,
      config
    );

    dispatch({ type: UPLOAD_STUDENTS_SUCCESS, payload: data.message });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPLOAD_STUDENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};
