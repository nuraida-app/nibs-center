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
  GET_STUDENT_ANSWER_FAIL,
  GET_STUDENT_ANSWER_REQ,
  GET_STUDENT_ANSWER_SUCCESS,
  UPDATE_ANSWER_FAIL,
  UPDATE_ANSWER_REQ,
  UPDATE_ANSWER_RESET,
  UPDATE_ANSWER_SUCCESS,
  get_scores_fail,
  get_scores_req,
  get_scores_success,
  give_score_fail,
  give_score_req,
  give_score_reset,
  give_score_success,
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

export const giveScoreEssayReducer = (state = {}, action) => {
  switch (action.type) {
    case give_score_req:
      return { loading: true };

    case give_score_success:
      return { loading: false, success: true, message: action.message };

    case give_score_fail:
      return { loading: false, success: false, error: action.error };

    case give_score_reset:
      return {};

    default:
      return { ...state };
  }
};

export const getScoresReducer = (state = [], action) => {
  switch (action.type) {
    case get_scores_req:
      return { scoreLoading: true };

    case get_scores_success:
      return { ...state, scoreLoading: false, scores: action.scores };

    case get_scores_fail:
      return { ...state, scoreLoading: false, error: action.error };

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

export const getStudentsAnswersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_STUDENT_ANSWER_REQ:
      return { loading: true };

    case GET_STUDENT_ANSWER_SUCCESS:
      return { ...state, loading: false, answers: action.answers };

    case GET_STUDENT_ANSWER_FAIL:
      return { ...state, loading: false, error: action.error };

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
