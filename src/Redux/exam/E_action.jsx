import axios from "axios";
import {
  ADD_EXAM_FAIL,
  ADD_EXAM_REQ,
  ADD_EXAM_SUCCESS,
  ADD__ROOM_FAIL,
  ADD__ROOM_REQ,
  ADD__ROOM_SUCCESS,
  DEL_EXAM_FAIL,
  DEL_EXAM_REQ,
  DEL_EXAM_SUCCESS,
  DEL_ROOM_FAIL,
  DEL_ROOM_REQ,
  DEL_ROOM_SUCCESS,
  DETAIL_EXAM_FAIL,
  DETAIL_EXAM_REQ,
  DETAIL_EXAM_SUCCESS,
  GET_EXAM_FAIL,
  GET_EXAM_REQ,
  GET_EXAM_SUCCESS,
  GET_ROOM_FAIL,
  GET_ROOM_REQ,
  GET_ROOM_SUCCESS,
  UP_EXAM_FAIL,
  UP_EXAM_REQ,
  UP_EXAM_SUCCESS,
  UP_ROOM_FAIL,
  UP_ROOM_REQ,
  UP_ROOM_SUCCESS,
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

// DETAIL EXAM WITH QUESTIONS
export const getDetailExam = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_EXAM_REQ });

    const { data } = await axios.get(`/api/exams/${id}`, config);

    dispatch({ type: DETAIL_EXAM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DETAIL_EXAM_FAIL, payload: error.message });
  }
};

// DETAIL EXAM
export const getExam = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_EXAM_REQ });

    const { data } = await axios.get(`/api/exams/detail-exam/${id}`, config);

    dispatch({ type: DETAIL_EXAM_SUCCESS, exam: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DETAIL_EXAM_FAIL,
      payload:
        error.response.data.message ||
        error.message ||
        error.response.data.error,
    });
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

// UPDATE EXAM
export const updateExam = (id, eData) => async (dispatch) => {
  try {
    dispatch({ type: UP_EXAM_REQ });

    const { data } = await axios.put(
      `/api/exams/update-exam/${id}`,
      eData,
      config
    );

    dispatch({ type: UP_EXAM_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: UP_EXAM_FAIL,
      payload: error.message || error.response.data.message,
    });
  }
};

// DELETE EXAM
export const deleteExam = (id) => async (dispatch) => {
  try {
    dispatch({ type: DEL_EXAM_REQ });

    const { data } = await axios.delete(`/api/exams/delete-exam/${id}`, config);

    dispatch({ type: DEL_EXAM_SUCCESS, payload: data.message });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DEL_EXAM_FAIL,
      payload: error.message || error.response.data.message,
    });
  }
};

// GET ROOMS
export const getRooms = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ROOM_REQ });

    const { data } = await axios.get("/api/rooms/get-rooms", config);

    dispatch({ type: GET_ROOM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ROOM_FAIL,
      payload: error.message || error.response.data.message,
    });
  }
};

// ADD ROOM
export const addRoom = (rData) => async (dispatch) => {
  try {
    dispatch({ type: ADD__ROOM_REQ });

    const { data } = await axios.post("/api/rooms/create-room", rData, config);

    dispatch({ type: ADD__ROOM_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: ADD__ROOM_FAIL,
      payload: error.message || error.response.data.message,
    });
  }
};

// DETAIL ROOM
export const detailRoom = (id) => async (dispatch) => {
  try {
    dispatch({ type: DEL_ROOM_REQ });

    const { data } = await axios.get(`/api/rooms/${id}`, config);

    dispatch({ type: DEL_ROOM_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: DEL_ROOM_FAIL,
      payload: error.message || error.response.data.message,
    });
  }
};

// UPDATE ROOM
export const updateRoom = (id, rData) => async (dispatch) => {
  try {
    dispatch({ type: UP_ROOM_REQ });

    const { data } = await axios.put(
      `/api/rooms/update-room/${id}`,
      rData,
      config
    );

    dispatch({ type: UP_ROOM_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      tyoe: UP_ROOM_FAIL,
      payload: error.message || error.response.data.message,
    });
  }
};

// DELETE
export const deleteRoom = (id) => async (dispatch) => {
  try {
    dispatch({ type: DEL_ROOM_REQ });

    const { data } = await axios.delete(`/api/rooms/delete-room/${id}`, config);

    dispatch({ type: DEL_ROOM_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: DEL_ROOM_FAIL,
      payload: error.message || error.response.data.message,
    });
  }
};
