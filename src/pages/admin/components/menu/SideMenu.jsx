import { Box, Menu, MenuItem, MenuList } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Dashboard from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import ApartmentIcon from "@mui/icons-material/Apartment";
import StairsIcon from "@mui/icons-material/Stairs";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import GroupIcon from "@mui/icons-material/Group";
import ClassIcon from "@mui/icons-material/Class";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import FolderIcon from "@mui/icons-material/Folder";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScoreIcon from "@mui/icons-material/Score";
import StyleIcon from "@mui/icons-material/Style";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HouseIcon from "@mui/icons-material/House";

const SideMenu = () => {
  const [academic, showAcademic] = useState(null);

  const open = Boolean(academic);

  const openAcademic = (event) => {
    showAcademic(event.currentTarget);
  };

  const closeAcademic = () => {
    showAcademic(null);
  };

  const [facility, showFacility] = useState(null);
  const openFacility = Boolean(facility);

  const facilityOpen = (event) => {
    showFacility(event.currentTarget);
  };

  const facilityClose = () => {
    showFacility(null);
  };

  const [openExam, setOpenExam] = useState(null);
  const examOpen = Boolean(openExam);

  const showExam = (event) => {
    setOpenExam(event.currentTarget);
  };

  const closeExam = () => {
    setOpenExam(null);
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        borderRadius: "10px",
        bgcolor: "#fff",
        padding: 1,
      }}
    >
      <MenuList sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <MenuItem component={Link} to={"/center/admin-dashboard"}>
          <Dashboard sx={{ color: "#90528c", mr: 2 }} />
          Dashboard
        </MenuItem>
        <MenuItem onClick={openAcademic}>
          <SchoolIcon sx={{ color: "#90528c", mr: 2 }} /> Academic
        </MenuItem>
        <Menu
          anchorEl={academic}
          open={open}
          onClose={closeAcademic}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={closeAcademic}
            component={Link}
            to="/center/admin-teacher-page"
          >
            <SupervisorAccountIcon sx={{ color: "#90528c", mr: 2 }} />
            Teachers
          </MenuItem>
          <MenuItem
            onClick={closeAcademic}
            component={Link}
            to="/center/admin-grade-page"
          >
            <StairsIcon sx={{ color: "#90528c", mr: 2 }} /> Grade
          </MenuItem>
          <MenuItem
            onClick={closeAcademic}
            component={Link}
            to="/center/admin-class-page"
          >
            <ClassIcon sx={{ color: "#90528c", mr: 2 }} /> Class
          </MenuItem>
          <MenuItem
            onClick={closeAcademic}
            component={Link}
            to="/center/admin-subject-page"
          >
            <StyleIcon sx={{ color: "#90528c", mr: 2 }} /> Subjects
          </MenuItem>
          <MenuItem
            onClick={closeAcademic}
            component={Link}
            to="/center/admin-student-page"
          >
            <GroupIcon sx={{ color: "#90528c", mr: 2 }} /> Students
          </MenuItem>

          <MenuItem
            onClick={closeAcademic}
            component={Link}
            to="/center/admin-score-page"
          >
            <ScoreIcon sx={{ color: "#90528c", mr: 2 }} /> Scores
          </MenuItem>
        </Menu>

        <MenuItem onClick={showExam}>
          <LaptopChromebookIcon sx={{ color: "#90528c", mr: 2 }} /> Exams
        </MenuItem>
        <Menu
          anchorEl={openExam}
          open={examOpen}
          onClick={closeExam}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={closeExam}
            component={Link}
            to="/center/admin-exam-page"
          >
            <FolderIcon sx={{ color: "#90528c", mr: 2 }} /> Bank
          </MenuItem>

          <MenuItem
            onClick={closeExam}
            component={Link}
            to="/center/admin-schedule-page"
          >
            <CalendarMonthIcon sx={{ color: "#90528c", mr: 2 }} /> Schedule
          </MenuItem>
        </Menu>

        <MenuItem
          onClick={facilityOpen}
          component={Link}
          to="/center/admin-facility-page"
        >
          <ApartmentIcon sx={{ color: "#90528c", mr: 2 }} /> Facilities
        </MenuItem>
        <Menu
          anchorEl={facility}
          open={openFacility}
          onClose={facilityClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={facilityClose}>
            <HouseIcon sx={{ color: "#90528c", mr: 2 }} /> Rooms
          </MenuItem>
          <MenuItem onClick={facilityClose}>
            <LocalOfferIcon sx={{ color: "#90528c", mr: 2 }} /> Booking Rooms
          </MenuItem>
        </Menu>
      </MenuList>
    </Box>
  );
};

export default SideMenu;
