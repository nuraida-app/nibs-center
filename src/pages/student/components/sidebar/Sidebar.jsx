import { MenuItem, MenuList } from "@mui/material";
import Dashboard from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SchoolIcon from "@mui/icons-material/School";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <MenuList sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <MenuItem component={Link} to="/student-dashboard">
        <Dashboard sx={{ color: "#90528c", mr: 2 }} />
        Dashboard
      </MenuItem>

      <MenuItem component={Link} to="/student-info">
        <AccountCircleIcon sx={{ color: "#90528c", mr: 2 }} />
        Information
      </MenuItem>

      <MenuItem component={Link} to="/student-exam">
        <LaptopChromebookIcon sx={{ color: "#90528c", mr: 2 }} /> Exams
      </MenuItem>

      <MenuItem component={Link} to="/student-report">
        <SchoolIcon sx={{ color: "#90528c", mr: 2 }} />
        Report
      </MenuItem>
    </MenuList>
  );
};

export default Sidebar;
