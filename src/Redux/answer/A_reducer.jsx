import {
  CREATE_ANSWER_FAIL,
  CREATE_ANSWER_REQ,
  CREATE_ANSWER_RESET,
  CREATE_ANSWER_SUCCESS,
  GET_ANSWER_FAIL,
  GET_ANSWER_REQ,
  GET_ANSWER_SUCCESS,
  GET_MY_ANSWER_FAIL,
  GET_MY_ANSWER_REQ,
  GET_MY_ANSWER_SUCCESS,
  UPDATE_ANSWER_FAIL,
  UPDATE_ANSWER_REQ,
  UPDATE_ANSWER_RESET,
  UPDATE_ANSWER_SUCCESS,
} from "./A_const";

export const createAnswerReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ANSWER_REQ:
      return { ...state, createLoading: true };

    case CREATE_ANSWER_SUCCESS:
      return {
        ...state,
        createLoading: false,
        isCreated: true,
        createMsg: action.message,
      };

    case CREATE_ANSWER_FAIL:
      return {
        ...state,
        createLoading: false,
        isCreated: false,
        error: action.error,
      };

    case CREATE_ANSWER_RESET:
      return { state: null };

    default:
      return { ...state };
  }
};

export const getMyAnswerReducer = (state = [], action) => {
  switch (action.type) {
    case GET_MY_ANSWER_REQ:
      return { ...state, myAnsLoading: true };

    case GET_MY_ANSWER_SUCCESS:
      return { ...state, myAnsLoading: false, answers: action.answers };

    case GET_MY_ANSWER_FAIL:
      return { ...state, myAnsLoading: false, error: action.error };

    default:
      return { ...state };
  }
};

export const getAnswerReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ANSWER_REQ:
      return { ...state, myAnsLoading: true };

    case GET_ANSWER_SUCCESS:
      return { ...state, myAnsLoading: false, myAnswers: action.answers };

    case GET_ANSWER_FAIL:
      return { ...state, myAnsLoading: false, error: action.error };

    default:
      return { ...state };
  }
};

export const updateAnswerReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ANSWER_REQ:
      return { upLoading: true };

    case UPDATE_ANSWER_SUCCESS:
      return {
        ...state,
        upLoading: false,
        isUpdated: true,
        updatedMsg: action.message,
      };

    case UPDATE_ANSWER_FAIL:
      return {
        ...state,
        upLoading: false,
        isUpdated: false,
        updateError: action.error,
      };

    case UPDATE_ANSWER_RESET:
      return { state: null };

    default:
      return { ...state };
  }
};
