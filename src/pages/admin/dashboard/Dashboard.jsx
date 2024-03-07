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
          <Content />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
