import {
  ADD_EXAM_FAIL,
  ADD_EXAM_REQ,
  ADD_EXAM_RESET,
  ADD_EXAM_SUCCESS,
  ADD__ROOM_FAIL,
  ADD__ROOM_REQ,
  ADD__ROOM_RESET,
  ADD__ROOM_SUCCESS,
  DETAIL_EXAM_FAIL,
  DETAIL_EXAM_REQ,
  DETAIL_EXAM_SUCCESS,
  GET_EXAM_FAIL,
  GET_EXAM_REQ,
  GET_EXAM_SUCCESS,
  GET_ROOM_FAIL,
  GET_ROOM_REQ,
  GET_ROOM_SUCCESS,
} from "./E_const";

export const getExamsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_EXAM_REQ:
    case DETAIL_EXAM_REQ:
      return {
        ...state,
        eLoad: true,
        detail_Load: true,
      };

    case GET_EXAM_SUCCESS:
      return {
        ...state,
        eLoad: false,
        detail_Load: false,
        exams: action.payload,
      };

    case DETAIL_EXAM_SUCCESS: {
      return {
        ...state,
        eLoad: false,
        detail_Load: false,
        exam_detail: action.payload,
      };
    }

    case GET_EXAM_FAIL:
    case DETAIL_EXAM_FAIL:
      return {
        ...state,
        eLoad: false,
        detail_Load: false,
        eError: action.payload,
        detail_error: action.payload,
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

export const getRoomsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ROOM_REQ:
      return {
        ...state,
        rLoad: true,
      };

    case GET_ROOM_SUCCESS:
      return {
        ...state,
        rLoad: false,
        rooms: action.payload,
      };

    case GET_ROOM_FAIL:
      return {
        ...state,
        rLoad: false,
        rError: action.payload,
      };

    default:
      return { ...state };
  }
};

export const addRoomReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD__ROOM_REQ:
      return {
        ...state,
        rAddLoad: true,
        rIsAdded: false,
      };

    case ADD__ROOM_SUCCESS:
      return {
        ...state,
        rAddLoad: false,
        rIsAdded: true,
        rSuccessMsg: action.payload,
      };

    case ADD__ROOM_FAIL:
      return {
        ...state,
        rAddLoad: false,
        rIsAdded: false,
        rErrorMsg: action.payload,
      };

    case ADD__ROOM_RESET:
      return {
        ...state,
        rAddLoad: false,
        rIsAdded: false,
        rSuccessMsg: null,
        rErrorMsg: null,
      };

    default:
      return { ...state };
  }
};
