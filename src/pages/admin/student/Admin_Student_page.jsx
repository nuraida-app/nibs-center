import { Fragment, useEffect } from "react";
import Topbar from "../components/topbar/Topbar";
import { Box } from "@mui/material";
import SideMenu from "../components/menu/SideMenu";
import { useDispatch } from "react-redux";
import { getStudents } from "../../../Redux/user/S_action";
import { getGrades } from "../../../Redux/grade/G_action";
import { getClasses } from "../../../Redux/class/C_action";
import S_content from "./S_content";
import { DETAIL_STUDENT_RESET } from "../../../Redux/user/S_const";

const Admin_Student_page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudents());

    dispatch(getGrades());

    dispatch(getClasses());

    dispatch({ type: DETAIL_STUDENT_RESET });
  }, []);
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
          <S_content />
        </Box>
      </Box>
    </Fragment>
  );
};

export default Admin_Student_page;
