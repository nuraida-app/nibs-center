import { Box } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import Indentity from "./Indentity";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailRoom, getDetailExam } from "../../../../Redux/exam/E_action";
import Functions from "./Functions";
import Students from "./Students";
import Analysis from "./Analysis";
import Scores from "./Scores";
import Essay from "./Essay/Essay";
import { getStudentsByGrade } from "../../../../Redux/user/S_action";
import { getLogs } from "../../../../Redux/logs/Log_action";

const D_content = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { roomId, id, grade } = params;

  const { rDetailLoad, room } = useSelector((state) => state.rooms);
  const { detail_load, exam_detail } = useSelector((state) => state.exams);
  const { sloading, students } = useSelector((state) => state.studentsByGrade);

  const [state, setState] = useState("students");

  useEffect(() => {
    dispatch(getDetailExam(id));

    dispatch(detailRoom(roomId));

    dispatch(getStudentsByGrade(grade));

    dispatch(getLogs(id));
  }, [id, grade]);

  const renderComponent = () => {
    switch (state) {
      case "students":
        return <Students load={sloading} data={students} />;
      case "analysis":
        return (
          <Analysis
            eload={detail_load}
            sLoad={sloading}
            students={students}
            exam={exam_detail}
          />
        );
      case "scores":
        return <Scores sLoad={sloading} students={students} />;
      case "essay":
        return (
          <Essay
            eload={detail_load}
            sLoad={sloading}
            students={students}
            exam={exam_detail}
          />
        );
      default:
        return null; // Komponen default jika state tidak sesuai
    }
  };

  return (
    <Fragment>
      <Indentity room={room} load={rDetailLoad} />

      <Functions
        exam={exam_detail}
        load={detail_load}
        component={(c) => setState(c)}
        students={students}
      />

      {renderComponent()}
    </Fragment>
  );
};

export default D_content;
