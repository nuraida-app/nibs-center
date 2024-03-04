import { Box, Button, Typography } from "@mui/material";
import UsersData from "./UsersData";
import F_Data from "./F_Data";

const Content = () => {
  return (
    <Box
      className="content"
      sx={{
        minHeight: 790,
        bgcolor: "#fff",
        borderRadius: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* USER DATA */}

      <Typography variant="h5" fontWeight="bold">
        STUDENTS DATA
      </Typography>
      <UsersData />

      <Typography variant="h5" fontWeight="bold">
        FACILITIES
      </Typography>
      <F_Data />
    </Box>
  );
};

export default Content;
