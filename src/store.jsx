import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { authReducer } from "./Redux/auth/auth_reducer";
import {
  addTeacherReducer,
  getTeacherDetailReducer,
  getTeachersReducers,
  updelTeacherReducer,
  uploadTeachersReducer,
} from "./Redux/user/T_reducer";
import {
  addSubjectReducer,
  getSubjectReducer,
} from "./Redux/subject/S_reducer";
import { addGradeReducer, getGradesReducer } from "./Redux/grade/G_reducer";
import { addClassReducer, getClassesReducer } from "./Redux/class/C_reducer";
import {
  addStudentReducer,
  getStudentsReducers,
  uploadStudentsReducer,
} from "./Redux/user/S_reducer";
import {
  addExamReducer,
  addRoomReducer,
  getExamsReducer,
  getRoomsReducer,
} from "./Redux/exam/E_reducer";
import {
  addQuizReducer,
  getQuizesReducer,
  quizUploadReducer,
} from "./Redux/exam/Q_reducer";

const reducer = {
  auth: authReducer,

  teachers: getTeachersReducers,
  teacher: getTeacherDetailReducer,
  t_add: addTeacherReducer,
  t_upload: uploadTeachersReducer,
  t_updel: updelTeacherReducer,

  students: getStudentsReducers,
  st_add: addStudentReducer,
  st_upload: uploadStudentsReducer,

  grades: getGradesReducer,
  g_add: addGradeReducer,

  classes: getClassesReducer,
  c_add: addClassReducer,

  subjects: getSubjectReducer,
  s_add: addSubjectReducer,

  exams: getExamsReducer,
  e_add: addExamReducer,

  Quizes: getQuizesReducer,
  q_add: addQuizReducer,
  q_upload: quizUploadReducer,

  rooms: getRoomsReducer,
  r_add: addRoomReducer,
};

const initialState = {};

const store = configureStore(
  {
    reducer: reducer,
    initialState: initialState,
    devTools: true,
  },
  applyMiddleware(thunk)
);

export default store;
