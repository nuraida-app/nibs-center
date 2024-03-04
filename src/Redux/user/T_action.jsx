import axios from "axios";
import {
  ADD_TEACHER_FAIL,
  ADD_TEACHER_REQ,
  ADD_TEACHER_SUCCESS,
  TEACHER_GET_FAIL,
  TEACHER_GET_REQ,
  TEACHER_GET_SUCCESS,
  UPLOAD_TEACHER_FAIL,
  UPLOAD_TEACHER_REQ,
  UPLOAD_TEACHER_SUCCESS,
} from "./T_const";

axios.defaults.baseURL = import.meta.env.VITE_BASE;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const getTeachers = () => async (dispatch) => {
  try {
    dispatch({ type: TEACHER_GET_REQ });

    const { data } = await axios.get("/api/users/get-teachers", config);

    dispatch({ type: TEACHER_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TEACHER_GET_FAIL, payload: error.message });
  }
};

export const addTeacher = (tData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TEACHER_REQ });

    const { data } = await axios.post("/api/users/create-user", tData, config);

    dispatch({ type: ADD_TEACHER_SUCCESS, payload: data.message });
  } catch (error) {
    console.log(error);
    dispatch({ type: ADD_TEACHER_FAIL, payload: error.response.data.message });
  }
};

export const uploadTeacher = (tData) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_TEACHER_REQ });

    const { data } = await axios.post(
      "/api/users/upload-teachers",
      tData,
      config
    );

    dispatch({ type: UPLOAD_TEACHER_SUCCESS, payload: data.message });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPLOAD_TEACHER_FAIL,
      payload: error.response.data.message,
    });
  }
};
