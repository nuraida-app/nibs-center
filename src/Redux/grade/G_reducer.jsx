import {
  ADD_GRADE_FAIL,
  ADD_GRADE_REQ,
  ADD_GRADE_RESET,
  ADD_GRADE_SUCCESS,
  GET_GRADE_FAIL,
  GET_GRADE_REQ,
  GET_GRADE_SUCCES,
} from "./G_const";

export const getGradesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_GRADE_REQ:
      return {
        ...state,
        gLoad: true,
      };

    case GET_GRADE_SUCCES:
      return {
        ...state,
        gLoad: false,
        grades: action.payload,
      };

    case GET_GRADE_FAIL:
      return {
        ...state,
        gLoad: false,
        gError: action.payload,
      };

    default:
      return { ...state };
  }
};

export const addGradeReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_GRADE_REQ:
      return {
        ...state,
        gAddLoad: true,
        gIsAdded: false,
      };

    case ADD_GRADE_SUCCESS:
      return {
        ...state,
        gAddLoad: false,
        gIsAdded: true,
        gAddSuccess: action.payload,
      };

    case ADD_GRADE_FAIL:
      return {
        ...state,
        gAddLoad: false,
        gIsAdded: false,
        gAddError: action.payload,
      };

    case ADD_GRADE_RESET:
      return {
        ...state,
        gAddError: null,
      };

    default:
      return { ...state };
  }
};
