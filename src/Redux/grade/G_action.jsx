import axios from "axios";
import {
  ADD_GRADE_FAIL,
  ADD_GRADE_REQ,
  ADD_GRADE_SUCCESS,
  GET_GRADE_FAIL,
  GET_GRADE_REQ,
  GET_GRADE_SUCCES,
} from "./G_const";

axios.defaults.baseURL = import.meta.env.VITE_BASE;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const getGrades = () => async (dispatch) => {
  try {
    dispatch({ type: GET_GRADE_REQ });

    const { data } = await axios.get("/api/grade/get-grades", config);

    dispatch({ type: GET_GRADE_SUCCES, payload: data });
  } catch (error) {
    dispatch({ type: GET_GRADE_FAIL, payload: error.message });
  }
};

export const addGrade = (gData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_GRADE_REQ });

    const { data } = await axios.post("/api/grade/create-grade", gData, config);

    dispatch({ type: ADD_GRADE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: ADD_GRADE_FAIL, payload: error.response.data.message });
  }
};
