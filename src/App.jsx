import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Student_page from "./pages/student/Student_page";
import Admin_page from "./pages/admin/Admin_page";

import Teacher_page from "./pages/teacher/Teacher_page";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Redux/auth/auth_action";
import Admin_Teacher_page from "./pages/admin/teacher/Admin_Teacher_page";
import Admin_Subject_Page from "./pages/admin/subject/Admin_Subject_Page";
import Admin_Grade_Page from "./pages/admin/grade/Admin_Grade_Page";
import Admin_Class_Page from "./pages/admin/class/Admin_Class_Page";
import Admin_Student_page from "./pages/admin/student/Admin_Student_page";
import Admin_Exam_Page from "./pages/admin/exam/Admin_Exam_Page";
import Q_list from "./pages/admin/exam/question/Q_list";
import Playground from "./Playground";
import Rooms from "./pages/admin/exam/rooms/Rooms";
import Detail from "./pages/admin/exam/detail/Detail";
import E_page from "./pages/student/exam/E_page";
import E_Start from "./pages/student/exam/start/E_Start";

function App() {
  const dispatch = useDispatch();

  const { logout, isLogout, logoutError, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const load = JSON.parse(localStorage.getItem("login"));

    if (load) {
      dispatch(loadUser());
    }
  }, [dispatch, user?.role]);

  useEffect(() => {
    if (isLogout) {
      toast.success(logout);
    } else {
      toast.error(logoutError);
    }
  }, [isLogout, logout, logoutError]);

  return (
    <BrowserRouter>
      <ToastContainer autoClose={1500} />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/playground" element={<Playground />} />

        {/* ADMIN ROUTES */}

        <Route path="/center/admin-dashboard" element={<Admin_page />} />

        <Route
          path="/center/admin-teacher-page"
          element={<Admin_Teacher_page />}
        />

        <Route path="/center/admin-grade-page" element={<Admin_Grade_Page />} />

        <Route path="/center/admin-class-page" element={<Admin_Class_Page />} />

        <Route
          path="/center/admin-subject-page"
          element={<Admin_Subject_Page />}
        />

        <Route
          path="/center/admin-student-page"
          element={<Admin_Student_page />}
        />

        <Route path="/center/admin/exam/:id/:name" element={<Q_list />} />

        <Route path="/center/admin-exam-page" element={<Admin_Exam_Page />} />

        <Route path="/center/admin-schedule-page" element={<Rooms />} />

        <Route
          path="/center/admin/classroom/:name/:roomId/exam/:id/grade/:grade"
          element={<Detail />}
        />

        {/* TEACHER ROUTES */}

        <Route path="/teacher-dashboard" element={<Teacher_page />} />

        {/* STUDENT ROUTS */}

        <Route path="/student-dashboard" element={<Student_page />} />

        <Route path="/student-exam" element={<E_page />} />

        <Route
          path="/start-exam/:id/:name/grade/:gradeId"
          element={<E_Start />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
