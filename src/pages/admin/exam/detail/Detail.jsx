import { Fragment, useEffect } from "react";
import Topbar from "../../components/topbar/Topbar";
import { Box } from "@mui/material";
import SideMenu from "../../components/menu/SideMenu";
import D_content from "./D_content";

const Detail = () => {
  return (
    <Fragment>
      <Topbar />
      <Box
        sx={{
          display: "flex",
          position: "relative",
          top: 63,
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
          <D_content />
        </Box>
      </Box>
    </Fragment>
  );
};

export default Detail;
