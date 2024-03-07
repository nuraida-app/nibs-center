import { Fragment, useEffect } from "react";
import Topbar from "../../components/topbar/Topbar";
import { Box } from "@mui/material";
import SideMenu from "../../components/menu/SideMenu";
import { useDispatch, useSelector } from "react-redux";
import { getQuizes } from "../../../../Redux/exam/Q_action";
import { useParams } from "react-router-dom";
import { getDetailExam } from "../../../../Redux/exam/E_action";
import Lists_quiz from "./Lists_quiz";

const Q_list = () => {
  const dispatch = useDispatch();

  const { detail_load, exam_detail } = useSelector((state) => state.exams);

  const params = useParams();

  useEffect(() => {
    dispatch(getDetailExam(params.id));
  }, [params]);

  return (
    <Fragment>
      <Topbar />
      <Box
        sx={{
          display: "flex",
          position: "relative",
          top: 63,
          // minHeight: "calc(100vh - 64px)",
        }}
      >
        <Box
          sx={{
            width: "15%",
            height: "calc(100vh - 63px)",
            position: "fixed",
            left: 0,
            p: 1,
          }}
        >
          <SideMenu />
        </Box>

        <Box
          sx={{
            width: "85%",
            height: "calc(100vh - 63px)",
            overflowY: "auto",
            right: 0,
            position: "absolute",
            bgcolor: "#acacac",
            p: 2,
          }}
        >
          {detail_load ? (
            <Box>...</Box>
          ) : (
            <Lists_quiz data={exam_detail} load={detail_load} />
          )}
        </Box>
      </Box>
    </Fragment>
  );
};

export default Q_list;
