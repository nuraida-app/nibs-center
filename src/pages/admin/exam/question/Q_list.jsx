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
          bgcolor: "#acacac",
          position: "relative",
          top: 64,
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Box
          sx={{
            width: "20%",
            height: 805,
            position: "fixed",
            left: 0,
            p: 1,
          }}
        >
          <SideMenu />
        </Box>

        <Box
          sx={{
            width: "80%",
            maxHeight: 816,
            overflow: "auto",
            right: 0,
            position: "absolute",
            p: 1,
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
