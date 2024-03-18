import axios from "axios";
import {
  ADD_STUDENT_FAIL,
  ADD_STUDENT_REQ,
  ADD_STUDENT_SUCCESS,
  DEL_STUDENT_FAIL,
  DEL_STUDENT_REQ,
  DEL_STUDENT_SUCCESS,
  DETAIL_STUDENT_FAIL,
  DETAIL_STUDENT_REQ,
  DETAIL_STUDENT_SUCCESS,
  STUDENTS_BY_CLASS_REQ,
  STUDENTS_BY_GRADE_FAIL,
  STUDENTS_BY_GRADE_SUCCESS,
  STUDENTS_GET_FAIL,
  STUDENTS_GET_REQ,
  STUDENTS_GET_SUCCESS,
  UPLOAD_STUDENTS_FAIL,
  UPLOAD_STUDENTS_REQ,
  UPLOAD_STUDENTS_SUCCESS,
  UP_STUDENT_FAIL,
  UP_STUDENT_REQ,
  UP_STUDENT_SUCCESS,
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

export const getStudentsByGrade = (gradeId) => async (dispatch) => {
  try {
    dispatch({ type: STUDENTS_BY_CLASS_REQ });

    const { data } = await axios.get(
      `/api/users/students-by-grade/${gradeId}`,
      config
    );

    dispatch({ type: STUDENTS_BY_GRADE_SUCCESS, students: data });
  } catch (error) {
    dispatch({ tyep: STUDENTS_BY_GRADE_FAIL, error: error.message });
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

export const getStudentDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_STUDENT_REQ });

    const { data } = await axios.get(`/api/users/student-detail/${id}`, config);

    dispatch({ type: DETAIL_STUDENT_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DETAIL_STUDENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateStudent = (id, sData) => async (dispatch) => {
  try {
    dispatch({ type: UP_STUDENT_REQ });

    const { data } = await axios.put(
      `/api/users/student-update/${id}`,
      sData,
      config
    );

    dispatch({ type: UP_STUDENT_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: UP_STUDENT_FAIL, payload: error.response.data.message });
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  try {
    dispatch({ type: DEL_STUDENT_REQ });

    const { data } = await axios.delete(
      `/api/users/student-delete/${id}`,
      config
    );

    dispatch({ type: DEL_STUDENT_SUCCESS, payload: data.message });
  } catch (error) {
    console.log(error);
    dispatch({ type: DEL_STUDENT_FAIL, payload: error.response.data.message });
  }
};
