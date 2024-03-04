import { Fragment, useEffect } from "react";
import Topbar from "../components/topbar/Topbar";
import { Box } from "@mui/material";
import SideMenu from "../components/menu/SideMenu";
import S_Content from "./S_Content";
import { useDispatch } from "react-redux";
import { getSubjects } from "../../../Redux/subject/S_action";

const Admin_Subject_Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubjects());
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
          <S_Content />
        </Box>
      </Box>
    </Fragment>
  );
};

export default Admin_Subject_Page;
