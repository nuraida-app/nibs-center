import { Fragment, useEffect } from "react";
import Topbar from "../components/topbar/Topbar";
import { Box } from "@mui/material";
import SideMenu from "../components/menu/SideMenu";
import E_content from "./E_content";
import { useDispatch } from "react-redux";
import { getTeachers } from "../../../Redux/user/T_action";
import { getGrades } from "../../../Redux/grade/G_action";

const Admin_exam_page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeachers());

    dispatch(getGrades());
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
          <E_content />
        </Box>
      </Box>
    </Fragment>
  );
};

export default Admin_exam_page;
