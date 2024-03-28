import { Box, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailExam } from "../../../../Redux/exam/E_action";
import Topbar from "./Topbar";
import E_questions from "./E_questions";

const E_Start = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { user, isAuthLoading } = useSelector((state) => state.auth);
  const { exam_detail, detail_load } = useSelector((state) => state.exams);

  useEffect(() => {
    dispatch(getDetailExam(params.id));
  }, [params]);
  return (
    <Box sx={{ height: "auto" }}>
      <Topbar user={user} load={isAuthLoading} exam={exam_detail} />

      <E_questions quiz={exam_detail?.questions} load={detail_load} />
    </Box>
  );
};

export default E_Start;
