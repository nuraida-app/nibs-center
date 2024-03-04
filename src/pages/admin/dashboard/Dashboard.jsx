import { Fragment, useEffect } from "react";
import Topbar from "../components/topbar/Topbar";
import { Box } from "@mui/material";
import SideMenu from "../components/menu/SideMenu";
import Content from "./Content";

import { useDispatch } from "react-redux";
import { getStudents } from "../../../Redux/user/S_action";
import { getGrades } from "../../../Redux/grade/G_action";
import { getClasses } from "../../../Redux/class/C_action";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudents());

    dispatch(getGrades());

    dispatch(getClasses());
  }, []);

  return (
    <Box>
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
          <Content />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
