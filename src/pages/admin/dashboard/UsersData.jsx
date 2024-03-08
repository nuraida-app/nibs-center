import { Box, Button, Typography } from "@mui/material";
import StairsIcon from "@mui/icons-material/Stairs";
import ClassIcon from "@mui/icons-material/Class";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Loader from "../../component/Loader/Loader";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useSelector } from "react-redux";

import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";
import GradeChart from "./GradeChart";
import ClassChart from "./ClassChart";

const UsersData = () => {
  const { students, sLoad } = useSelector((state) => state.students);
  const { grades, gLoad } = useSelector((state) => state.grades);
  const { classes, cLoad } = useSelector((state) => state.classes);

  const buttons = [
    {
      label: "Grades",
      icon: (
        <StairsIcon
          sx={{
            fontSize: 40,
            color: "white",
            "&:hover": { transform: "scale(1.2)" },
            transition: "transform 0.5s ease-in-out",
          }}
        />
      ),
      num: grades?.length,
      color: "#c8e6f1",
    },
    {
      label: "Classes",
      icon: (
        <ClassIcon
          sx={{
            fontSize: 40,
            color: "white",
            "&:hover": { transform: "scale(1.2)" },
            transition: "transform 0.5s ease-in-out",
          }}
        />
      ),
      num: classes?.length,
      color: "#eedbf1",
    },
    {
      label: "Students",
      icon: (
        <PeopleAltIcon
          sx={{
            fontSize: 40,
            color: "white",
            "&:hover": { transform: "scale(1.2)" },
            transition: "transform 0.5s ease-in-out",
          }}
        />
      ),
      num: students?.length,
      color: "#d9cbf3",
    },
  ];

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          flexWrap: "wrap",
          gap: "20px",
          mb: 2,
          p: 1,
          bgcolor: "white",
          borderRadius: "5px",
        }}
      >
        {buttons.map((item, index) => (
          <Button
            key={index}
            variant="contained"
            sx={{ bgcolor: item.color, color: "black" }}
          >
            {item.icon}

            <Box sx={{ ml: 2 }}>
              <Typography variant="h5" align="left">
                {item.num}
              </Typography>
              <Typography>{item.label}</Typography>
            </Box>
          </Button>
        ))}
      </Box>

      {sLoad || gLoad || cLoad ? (
        <Box
          sx={{
            width: "100%",
            height: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            bgcolor: "whitesmoke",
            borderRadius: "5px",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
              width: "50%",
              p: 2,
              flex: 1,
            }}
          >
            <GradeChart students={students} grades={grades} />
          </Box>

          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
              width: "50%",
              p: 2,
              flex: 1,
            }}
          >
            <ClassChart students={students} classes={classes} />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default UsersData;
