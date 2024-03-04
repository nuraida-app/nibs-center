import {
  ADD_TEACHER_FAIL,
  ADD_TEACHER_REQ,
  ADD_TEACHER_RESET,
  ADD_TEACHER_SUCCESS,
  TEACHER_GET_FAIL,
  TEACHER_GET_REQ,
  TEACHER_GET_SUCCESS,
  UPLOAD_TEACHER_FAIL,
  UPLOAD_TEACHER_REQ,
  UPLOAD_TEACHER_RESET,
  UPLOAD_TEACHER_SUCCESS,
} from "./T_const";

export const getTeachersReducers = (state = [], action) => {
  switch (action.type) {
    case TEACHER_GET_REQ:
      return {
        ...state,
        tLoad: true,
      };

    case TEACHER_GET_SUCCESS:
      return {
        ...state,
        tLoad: false,
        teachers: action.payload,
      };

    case TEACHER_GET_FAIL:
      return {
        ...state,
        tLoad: false,
        tError: action.payload,
      };

    default:
      return { ...state };
  }
};

export const addTeacherReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TEACHER_REQ:
      return {
        ...state,
        tAddLoad: true,
      };

    case ADD_TEACHER_SUCCESS:
      return {
        ...state,
        tAddLoad: false,
        tIsAdded: true,
        tAddSuccess: action.payload,
      };

    case ADD_TEACHER_FAIL:
      return {
        ...state,
        tAddLoad: false,
        tIsAdded: false,
        tAddError: action.payload,
      };

    case ADD_TEACHER_RESET:
      return {
        ...state,
        tAddError: null,
      };

    default:
      return { ...state };
  }
};

export const uploadTeachersReducer = (state = [], action) => {
  switch (action.type) {
    case UPLOAD_TEACHER_REQ:
      return {
        ...state,
        tUploadLoad: true,
      };

    case UPLOAD_TEACHER_SUCCESS:
      return {
        ...state,
        tUploadLoad: false,
        tIsUploaded: true,
        tUploadSuccess: action.payload,
      };

    case UPLOAD_TEACHER_FAIL:
      return {
        ...state,
        tUploadLoad: false,
        tIsUploaded: false,
        tUploadError: action.payload,
      };

    case UPLOAD_TEACHER_RESET:
      return {
        ...state,
        tUploadError: null,
      };

    default:
      return { ...state };
  }
};
