import {
  ADD_STUDENT_FAIL,
  ADD_STUDENT_REQ,
  ADD_STUDENT_RESET,
  ADD_STUDENT_SUCCESS,
  DEL_STUDENT_FAIL,
  DEL_STUDENT_REQ,
  DEL_STUDENT_RESET,
  DEL_STUDENT_SUCCESS,
  DETAIL_STUDENT_FAIL,
  DETAIL_STUDENT_REQ,
  DETAIL_STUDENT_RESET,
  DETAIL_STUDENT_SUCCESS,
  STUDENTS_GET_FAIL,
  STUDENTS_GET_REQ,
  STUDENTS_GET_SUCCESS,
  UPLOAD_STUDENTS_FAIL,
  UPLOAD_STUDENTS_REQ,
  UPLOAD_STUDENTS_RESET,
  UPLOAD_STUDENTS_SUCCESS,
  UP_STUDENT_FAIL,
  UP_STUDENT_REQ,
  UP_STUDENT_RESET,
  UP_STUDENT_SUCCESS,
} from "./S_const";

export const getStudentsReducers = (state = [], action) => {
  switch (action.type) {
    case STUDENTS_GET_REQ:
      return {
        ...state,
        sLoad: true,
      };

    case STUDENTS_GET_SUCCESS:
      return {
        ...state,
        sLoad: false,
        students: action.payload,
      };

    case STUDENTS_GET_FAIL:
      return {
        ...state,
        sLoad: false,
        sError: action.payload,
      };

    default:
      return { ...state };
  }
};

export const addStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_STUDENT_REQ:
      return {
        ...state,
        sAddLoad: true,
      };

    case ADD_STUDENT_SUCCESS:
      return {
        ...state,
        sAddLoad: false,
        sIsAdded: true,
        sAddSuccess: action.payload,
      };

    case ADD_STUDENT_FAIL:
      return {
        ...state,
        sAddLoad: false,
        sIsAdded: false,
        sAddError: action.payload,
      };

    case ADD_STUDENT_RESET:
      return {
        ...state,
        sAddError: null,
        sAddSuccess: null,
      };

    default:
      return { ...state };
  }
};

export const uploadStudentsReducer = (state = [], action) => {
  switch (action.type) {
    case UPLOAD_STUDENTS_REQ:
      return {
        ...state,
        sUploadLoad: true,
      };

    case UPLOAD_STUDENTS_SUCCESS:
      return {
        ...state,
        sUploadLoad: false,
        sIsUploaded: true,
        sUploadSuccess: action.payload,
      };

    case UPLOAD_STUDENTS_FAIL:
      return {
        ...state,
        sUploadLoad: false,
        sIsUploaded: false,
        sUploadError: action.payload,
      };

    case UPLOAD_STUDENTS_RESET:
      return {
        ...state,
        sUploadError: null,
      };

    default:
      return { ...state };
  }
};

export const getStudentDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case DETAIL_STUDENT_REQ:
      return {
        ...state,
        sDetailLoad: true,
      };

    case DETAIL_STUDENT_SUCCESS:
      return {
        ...state,
        sDetailLoad: false,
        student: action.payload,
      };

    case DETAIL_STUDENT_FAIL:
      return {
        ...state,
        sDetailLoad: false,
        sDetailError: action.payload,
      };

    case DETAIL_STUDENT_RESET:
      return {
        ...state,
        sDetailLoad: false,
        student: null,
        sDetail: null,
        sDetailError: null,
      };

    default:
      return { ...state };
  }
};

export const updelSudentReducer = (state = {}, action) => {
  switch (action.type) {
    case UP_STUDENT_REQ:
    case DEL_STUDENT_REQ:
      return {
        ...state,
        sUpDelLoad: true,
      };

    case UP_STUDENT_SUCCESS:
      return {
        ...state,
        sUpDelLoad: false,
        sIsUpdated: true,
        sUpMsg: action.payload,
      };

    case UP_STUDENT_FAIL:
      return {
        ...state,
        sUpDelLoad: false,
        sIsUpdated: false,
        sUpError: action.payload,
      };

    case DEL_STUDENT_SUCCESS:
      return {
        ...state,
        sUpDelLoad: false,
        sIsDeleted: true,
        sDelMsg: action.payload,
      };

    case DEL_STUDENT_FAIL:
      return {
        ...state,
        sUpDelLoad: false,
        sIsDeleted: false,
        sDelError: action.payload,
      };

    case UP_STUDENT_RESET:
    case DEL_STUDENT_RESET:
      return {
        ...state,
        sUpDelLoad: false,

        sIsUpdated: false,
        sIsDeleted: false,

        sUpMsg: null,
        sDelMsg: null,

        sUpError: null,
        sDelError: null,
      };

    default:
      return { ...state };
  }
};
