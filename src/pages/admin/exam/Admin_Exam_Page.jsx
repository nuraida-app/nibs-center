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
          <E_content />
        </Box>
      </Box>
    </Fragment>
  );
};

export default Admin_exam_page;
