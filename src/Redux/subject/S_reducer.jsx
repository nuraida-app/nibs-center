import {
  ADD_SUBJECT_FAIL,
  ADD_SUBJECT_REQ,
  ADD_SUBJECT_RESET,
  ADD_SUBJECT_SUCCESS,
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
        sAddError: null,
      };

    default:
      return { ...state };
  }
};
