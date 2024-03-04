import {
  ADD_CLASS_FAIL,
  ADD_CLASS_REQ,
  ADD_CLASS_RESET,
  ADD_CLASS_SUCCESS,
  GET_CLASS_FAIL,
  GET_CLASS_REQ,
  GET_CLASS_SUCCESS,
} from "./C_const";

export const getClassesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CLASS_REQ:
      return {
        ...state,
        cLoad: true,
      };

    case GET_CLASS_SUCCESS:
      return {
        ...state,
        cLoad: false,
        classes: action.payload,
      };

    case GET_CLASS_FAIL:
      return {
        ...state,
        cLoad: false,
        cError: action.payload,
      };

    default:
      return { ...state };
  }
};

export const addClassReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CLASS_REQ:
      return {
        ...state,
        cAddLoad: true,
        cIsAdded: false,
      };

    case ADD_CLASS_SUCCESS:
      return {
        ...state,
        cAddLoad: false,
        cIsAdded: true,
        cAddSuccess: action.payload,
      };

    case ADD_CLASS_FAIL:
      return {
        ...state,
        cAddLoad: false,
        cIsAdded: false,
        cAddError: action.payload,
      };

    case ADD_CLASS_RESET:
      return {
        ...state,
        cAddError: null,
      };

    default:
      return { ...state };
  }
};
