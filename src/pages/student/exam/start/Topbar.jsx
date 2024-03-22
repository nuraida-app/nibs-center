import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

const Topbar = ({ user, load, exam }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "#90528c",
      }}
    >
      <Container>
        <Toolbar>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Topbar;
