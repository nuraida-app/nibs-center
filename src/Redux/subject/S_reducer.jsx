import {
  ADD_SUBJECT_FAIL,
  ADD_SUBJECT_REQ,
  ADD_SUBJECT_RESET,
  ADD_SUBJECT_SUCCESS,
  DEL_SUBJECT_FAIL,
  DEL_SUBJECT_REQ,
  DEL_SUBJECT_RESET,
  DEL_SUBJECT_SUCCESS,
  GET_SUBJECTS_FAIL,
  GET_SUBJECTS_REQ,
  GET_SUBJECTS_SUCCESS,
} from "./S-Const";

export const getSubjectReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SUBJECTS_REQ:
      return {
        sLoad: true,
      };

    case GET_SUBJECTS_SUCCESS:
      return {
        sLoad: false,
        subjects: action.payload,
      };

    case GET_SUBJECTS_FAIL:
      return {
        sLoad: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export const addSubjectReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SUBJECT_REQ:
      return {
        ...state,
        sAddLoad: true,
        sIsAdded: false,
      };

    case ADD_SUBJECT_SUCCESS:
      return {
        ...state,
        sAddLoad: false,
        sIsAdded: true,
        sAddSuccess: action.payload,
      };

    case ADD_SUBJECT_FAIL:
      return {
        ...state,
        sAddLoad: false,
        sIsAdded: false,
        sAddError: action.payload,
      };

    case ADD_SUBJECT_RESET:
      return {
        ...state,
        sIsAdded: false,
        sAddSuccess: null,
        sAddError: null,
      };

    default:
      return { ...state };
  }
};

export const delSubjectReducer = (state = {}, action) => {
  switch (action.type) {
    case DEL_SUBJECT_REQ:
      return {
        ...state,
        sDelLoad: true,
        sIsDeleted: false,
      };

    case DEL_SUBJECT_SUCCESS:
      return {
        ...state,
        sDelLoad: false,
        sIsDeleted: true,
        sDelSuccess: action.payload,
      };

    case DEL_SUBJECT_FAIL:
      return {
        ...state,
        sDelLoad: false,
        sIsDeleted: false,
        sDelError: action.payload,
      };

    case DEL_SUBJECT_RESET:
      return {
        ...state,
        sDelLoad: false,
        sIsDeleted: false,
        sDelSuccess: null,
        sDelError: null,
      };

    default:
      return { ...state };
  }
};
