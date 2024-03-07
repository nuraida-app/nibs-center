import { Fragment, useEffect } from "react";
import Topbar from "../components/topbar/Topbar";
import { Box } from "@mui/material";
import SideMenu from "../components/menu/SideMenu";
import Teacher_content from "./Teacher_content";
import { useDispatch } from "react-redux";
import { getTeachers } from "../../../Redux/user/T_action";
import { getSubjects } from "../../../Redux/subject/S_action";

const Admin_Teacher_page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeachers());

    dispatch(getSubjects());
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
          <Teacher_content />
        </Box>
      </Box>
    </Fragment>
  );
};

export default Admin_Teacher_page;
