import { Fragment, useEffect } from "react";
import Topbar from "../../components/topbar/Topbar";
import { Box } from "@mui/material";
import SideMenu from "../../components/menu/SideMenu";
import R_content from "./R_content";
import { useDispatch } from "react-redux";
import { getExams, getRooms } from "../../../../Redux/exam/E_action";

const Rooms = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRooms());

    dispatch(getExams());
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
          <R_content />
        </Box>
      </Box>
    </Fragment>
  );
};

export default Rooms;
