import {
  ADD_TEACHER_FAIL,
  ADD_TEACHER_REQ,
  ADD_TEACHER_RESET,
  ADD_TEACHER_SUCCESS,
  DEL_TEACHER_FAIL,
  DEL_TEACHER_REQ,
  DEL_TEACHER_RESET,
  DEL_TEACHER_SUCCESS,
  DETAIL_TEACHER_FAIL,
  DETAIL_TEACHER_REQ,
  DETAIL_TEACHER_RESET,
  DETAIL_TEACHER_SUCCESS,
  TEACHER_GET_FAIL,
  TEACHER_GET_REQ,
  TEACHER_GET_SUCCESS,
  UPLOAD_TEACHER_FAIL,
  UPLOAD_TEACHER_REQ,
  UPLOAD_TEACHER_RESET,
  UPLOAD_TEACHER_SUCCESS,
  UP_TEACHER_FAIL,
  UP_TEACHER_REQ,
  UP_TEACHER_RESET,
  UP_TEACHER_SUCCESS,
} from "./T_const";

export const getTeachersReducers = (state = [], action) => {
  switch (action.type) {
    case TEACHER_GET_REQ:
      return {
        ...state,
        tLoad: true,
      };

    case TEACHER_GET_SUCCESS:
      return {
        ...state,
        tLoad: false,
        teachers: action.payload,
      };

    case TEACHER_GET_FAIL:
      return {
        ...state,
        tLoad: false,
        tError: action.payload,
      };

    default:
      return { ...state };
  }
};

export const addTeacherReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TEACHER_REQ:
      return {
        ...state,
        tAddLoad: true,
      };

    case ADD_TEACHER_SUCCESS:
      return {
        ...state,
        tAddLoad: false,
        tIsAdded: true,
        tAddSuccess: action.payload,
      };

    case ADD_TEACHER_FAIL:
      return {
        ...state,
        tAddLoad: false,
        tIsAdded: false,
        tAddError: action.payload,
      };

    case ADD_TEACHER_RESET:
      return {
        ...state,
        tAddError: null,
      };

    default:
      return { ...state };
  }
};

export const uploadTeachersReducer = (state = [], action) => {
  switch (action.type) {
    case UPLOAD_TEACHER_REQ:
      return {
        ...state,
        tUploadLoad: true,
      };

    case UPLOAD_TEACHER_SUCCESS:
      return {
        ...state,
        tUploadLoad: false,
        tIsUploaded: true,
        tUploadSuccess: action.payload,
      };

    case UPLOAD_TEACHER_FAIL:
      return {
        ...state,
        tUploadLoad: false,
        tIsUploaded: false,
        tUploadError: action.payload,
      };

    case UPLOAD_TEACHER_RESET:
      return {
        ...state,
        tUploadError: null,
      };

    default:
      return { ...state };
  }
};

export const getTeacherDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case DETAIL_TEACHER_REQ:
      return {
        ...state,
        tDetailLoad: true,
      };

    case DETAIL_TEACHER_SUCCESS:
      return {
        ...state,
        tDetailLoad: false,
        teacher: action.payload,
      };

    case DETAIL_TEACHER_FAIL:
      return {
        ...state,
        tDetailLoad: false,
        tDetailError: action.payload,
      };

    case DETAIL_TEACHER_RESET:
      return {
        ...state,
        tDetailError: null,
        teacher: null,
      };

    default:
      return { ...state };
  }
};

export const updelTeacherReducer = (state = {}, action) => {
  switch (action.type) {
    case UP_TEACHER_REQ:
    case DEL_TEACHER_REQ:
      return {
        ...state,
        tUp_Load: true,
        tDel_Load: true,
      };

    case UP_TEACHER_SUCCESS:
      return {
        ...state,
        tUp_Load: false,
        tDel_Load: false,
        tIsUpdated: true,
        tIsDeleted: false,
        tUp_Success: action.payload,
      };

    case DEL_TEACHER_SUCCESS:
      return {
        ...state,
        tUp_Load: false,
        tDel_Load: false,
        tIsUpdated: false,
        tIsDeleted: true,
        tDel_Success: action.payload,
      };

    case UP_TEACHER_FAIL:
      return {
        ...state,
        tUp_Load: false,
        tDel_Load: false,
        tIsUpdated: false,
        tIsDeleted: false,
        tUp_Error: action.payload,
      };

    case DEL_TEACHER_FAIL:
      return {
        ...state,
        tUp_Load: false,
        tDel_Load: false,
        tIsUpdated: false,
        tIsDeleted: false,
        tDel_Error: action.payload,
      };

    case UP_TEACHER_RESET:
    case DEL_TEACHER_RESET:
      return {
        ...state,
        tUp_Load: false,
        tDel_Load: false,
        tIsUpdated: false,
        tIsDeleted: false,
        tUp_Error: null,
        tDel_Error: null,
      };

    default:
      return { ...state };
  }
};
