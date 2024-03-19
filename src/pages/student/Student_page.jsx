import { Box } from "@mui/material";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./dashboard/Dashboard";

const Student_page = () => {
  return (
    <Box>
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
          <Sidebar />
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
          <Dashboard />
        </Box>
      </Box>
    </Box>
  );
};

export default Student_page;
