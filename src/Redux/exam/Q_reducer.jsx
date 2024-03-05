import {
  ADD_QUIZ_FAIL,
  ADD_QUIZ_REQ,
  ADD_QUIZ_RESET,
  ADD_QUIZ_SUCCESS,
  GET_QUIZ_FAIL,
  GET_QUIZ_REQ,
  GET_QUIZ_SUCCESS,
} from "./Q_const";

export const getQuizesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_QUIZ_REQ:
      return {
        ...state,
        qLoad: true,
      };

    case GET_QUIZ_SUCCESS:
      return {
        ...state,
        qLoad: false,
        Quizes: action.payload,
      };

    case GET_QUIZ_FAIL:
      return {
        ...state,
        qLoad: false,
        qError: action.payload,
      };

    default:
      return { ...state };
  }
};

export const addQuizReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_QUIZ_REQ:
      return {
        ...state,
        qAddLoad: true,
        qIsAdded: false,
      };

    case ADD_QUIZ_SUCCESS:
      return {
        ...state,
        qAddLoad: false,
        qIsAdded: true,
        qSuccessMsg: action.payload,
      };

    case ADD_QUIZ_FAIL:
      return {
        ...state,
        qAddLoad: false,
        qIsAdded: false,
        qErrorMsg: action.payload,
      };

    case ADD_QUIZ_RESET:
      return {
        ...state,
        qAddLoad: false,
        qIsAdded: false,
        qErrorMsg: null,
      };

    default:
      return { ...state };
  }
};
