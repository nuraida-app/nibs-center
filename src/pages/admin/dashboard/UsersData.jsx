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
    },
  ];

  return (
    <div>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {buttons.map((item, index) => (
          <Button key={index} variant="contained" color="success">
            {item.icon}

            <Box sx={{ ml: 2 }}>
              <Typography variant="h5" align="left">
                {item.num}
              </Typography>
              <Typography variant="h6" color="#fff">
                {item.label}
              </Typography>
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
            flexDirection: "column",
          }}
        >
          <Box sx={{ p: 2, height: 500 }}>
            <GradeChart students={students} grades={grades} />
          </Box>

          <Box sx={{ p: 2, height: 500 }}>
            <ClassChart students={students} classes={classes} />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default UsersData;
