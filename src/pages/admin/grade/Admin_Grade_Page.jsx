import { Fragment, useEffect } from "react";
import Topbar from "../components/topbar/Topbar";
import { Box } from "@mui/material";
import SideMenu from "../components/menu/SideMenu";
import G_Content from "./G_Content";

import { useDispatch } from "react-redux";
import { getGrades } from "../../../Redux/grade/G_action";

const Admin_Grade_Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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
          <G_Content />
        </Box>
      </Box>
    </Fragment>
  );
};

export default Admin_Grade_Page;
