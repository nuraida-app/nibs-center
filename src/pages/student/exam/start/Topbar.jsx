import { Box, Typography } from "@mui/material";

const Topbar = ({ user, load, exam }) => {
  return (
    <Box
      sx={{
        height: 40,
        bgcolor: "#90528c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 60,
        p: 4,
      }}
    >
      <Typography
        align="center"
        sx={{
          color: "white",
          width: `calc(100% - ${load ? 0 : user?.name.length * 12}px)`,
        }}
      >
        {load ? null : user?.name}
      </Typography>

      <Typography
        align="center"
        sx={{
          color: "white",
          width: `calc(100% - ${exam?.exam_name.length * 12}px)`,
        }}
      >
        {exam?.exam_name}
      </Typography>

      <Typography
        align="center"
        sx={{
          color: "white",
          width: `calc(100% - ${exam?.exam_name.length * 12}px)`,
        }}
      >
        00 : 00 : 00
      </Typography>
    </Box>
  );
};

export default Topbar;
