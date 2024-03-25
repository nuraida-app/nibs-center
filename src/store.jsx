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
  delSubjectReducer,
  getSubjectReducer,
} from "./Redux/subject/S_reducer";
import {
  addGradeReducer,
  delGradeReducer,
  getGradesReducer,
} from "./Redux/grade/G_reducer";
import {
  addClassReducer,
  delClassReducer,
  getClassesReducer,
} from "./Redux/class/C_reducer";
import {
  addStudentReducer,
  getStudentDetailReducer,
  getStudentsByClassReducer,
  getStudentsByGradeReducer,
  getStudentsReducers,
  updelSudentReducer,
  uploadStudentsReducer,
} from "./Redux/user/S_reducer";
import {
  addExamReducer,
  addRoomReducer,
  getExamByGradeReducer,
  getExamsReducer,
  getRoomsReducer,
  updelExamReducer,
  updelRoomReducer,
} from "./Redux/exam/E_reducer";
import {
  addQuizReducer,
  getQuizesReducer,
  quizUploadReducer,
} from "./Redux/exam/Q_reducer";
import {
  createAnswerReducer,
  getAnswerReducer,
  getMyAnswerReducer,
  updateAnswerReducer,
} from "./Redux/answer/A_reducer";
import { createLogReducer, getLogsReducers } from "./Redux/logs/Log_reducer";

const reducer = {
  auth: authReducer,

  teachers: getTeachersReducers,
  teacher: getTeacherDetailReducer,
  t_add: addTeacherReducer,
  t_upload: uploadTeachersReducer,
  t_updel: updelTeacherReducer,

  students: getStudentsReducers,
  studentsByGrade: getStudentsByGradeReducer,
  studentsByClass: getStudentsByClassReducer,
  student: getStudentDetailReducer,
  st_add: addStudentReducer,
  st_upload: uploadStudentsReducer,
  st_updel: updelSudentReducer,

  grades: getGradesReducer,
  g_add: addGradeReducer,
  del_grade: delGradeReducer,

  classes: getClassesReducer,
  c_add: addClassReducer,
  del_class: delClassReducer,

  subjects: getSubjectReducer,
  s_add: addSubjectReducer,
  s_del: delSubjectReducer,

  exams: getExamsReducer,
  e_add: addExamReducer,
  e_updel: updelExamReducer,
  examsByGrade: getExamByGradeReducer,

  Quizes: getQuizesReducer,
  q_add: addQuizReducer,
  q_upload: quizUploadReducer,

  answers: getAnswerReducer,
  myAnswers: getMyAnswerReducer,
  a_add: createAnswerReducer,
  a_update: updateAnswerReducer,

  rooms: getRoomsReducer,
  r_add: addRoomReducer,
  r_updel: updelRoomReducer,

  createLog: createLogReducer,
  logs: getLogsReducers,
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
