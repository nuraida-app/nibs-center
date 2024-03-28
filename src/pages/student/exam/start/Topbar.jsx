import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Topbar = ({ user, load, exam }) => {
  const params = useParams();

  const start = params.start;
  const end = params.end;

  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();

    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference <= 0) {
        clearInterval(countdown);

        window.location.href = `${import.meta.env.VITE_DOMAIN}/student-exam`;
      } else {
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft(
          `${hours < 10 ? "0" + hours : hours}:${
            minutes < 10 ? "0" + minutes : minutes
          }:${seconds < 10 ? "0" + seconds : seconds}`
        );
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [start, end]);

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

          {timeLeft !== null ? (
            <Typography
              align="center"
              sx={{
                color: "white",
                width: `calc(100% - ${exam?.exam_name.length * 12}px)`,
              }}
            >
              {timeLeft}
            </Typography>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Topbar;
