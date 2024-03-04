import {
  ADD_EXAM_FAIL,
  ADD_EXAM_REQ,
  ADD_EXAM_RESET,
  ADD_EXAM_SUCCESS,
  GET_EXAM_FAIL,
  GET_EXAM_REQ,
  GET_EXAM_SUCCESS,
} from "./E_const";

export const getExamsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_EXAM_REQ:
      return {
        ...state,
        eLoad: true,
      };

    case GET_EXAM_SUCCESS:
      return {
        ...state,
        eLoad: false,
        exams: action.payload,
      };

    case GET_EXAM_FAIL:
      return {
        ...state,
        eLoad: false,
        eError: action.payload,
      };

    default:
      return { ...state };
  }
};

export const addExamReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_EXAM_REQ:
      return {
        ...state,
        eAddLoad: true,
        eIsAdded: false,
      };

    case ADD_EXAM_SUCCESS:
      return {
        ...state,
        eAddLoad: false,
        eIsAdded: true,
        eSuccessMsg: action.payload,
      };

    case ADD_EXAM_FAIL:
      return {
        ...state,
        eAddLoad: false,
        eIsAdded: false,
        eErrorMsg: action.payload,
      };

    case ADD_EXAM_RESET:
      return {
        ...state,
        eAddLoad: false,
        eIsAdded: false,
        eErrorMsg: null,
      };

    default:
      return { ...state };
  }
};
