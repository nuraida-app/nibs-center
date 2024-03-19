import { MenuItem, MenuList } from "@mui/material";
import Dashboard from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SchoolIcon from "@mui/icons-material/School";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";

const Sidebar = () => {
  return (
    <MenuList sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <MenuItem>
        <Dashboard sx={{ color: "#90528c", mr: 2 }} />
        Dashboard
      </MenuItem>

      <MenuItem>
        <AccountCircleIcon sx={{ color: "#90528c", mr: 2 }} />
        Information
      </MenuItem>

      <MenuItem>
        <LaptopChromebookIcon sx={{ color: "#90528c", mr: 2 }} /> Exams
      </MenuItem>

      <MenuItem>
        <SchoolIcon sx={{ color: "#90528c", mr: 2 }} />
        Report
      </MenuItem>
    </MenuList>
  );
};

export default Sidebar;
