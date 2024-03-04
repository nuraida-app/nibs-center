import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { authReducer } from "./Redux/auth/auth_reducer";
import {
  addTeacherReducer,
  getTeachersReducers,
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
import { addExamReducer, getExamsReducer } from "./Redux/exam/E_reducer";

const reducer = {
  auth: authReducer,

  teachers: getTeachersReducers,
  t_add: addTeacherReducer,
  t_upload: uploadTeachersReducer,

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
