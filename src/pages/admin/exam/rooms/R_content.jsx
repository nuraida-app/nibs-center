import {
  Backdrop,
  Box,
  IconButton,
  Input,
  Modal,
  Tooltip,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import { blue, red } from "@mui/material/colors";
import { useState, useRef, useEffect } from "react";
import R_add from "./R_add";
import R_table from "./R_table";
import { useSelector } from "react-redux";

const R_content = () => {
  const [add, setAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { r_load, rooms } = useSelector((state) => state.rooms);

  return (
    <Box>
      {/* FUNCTION */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "whitesmoke",
          borderRadius: "5px",
          mb: 2,
          p: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            borderRadius: "5px",
            bgcolor: "#E0E0E0",
            padding: "5px",
          }}
        >
          <SearchIcon />

          <Input type="text" placeholder="Search by Name" />
        </Box>

        {/* BUTTONS */}
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Tooltip title="Add">
            <IconButton onClick={() => setAdd(true)}>
              <AddCircleIcon sx={{ color: blue[500] }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete All">
            <IconButton>
              <FolderDeleteIcon sx={{ color: red[400] }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <R_table rooms={rooms} load={r_load} />

      <Modal
        open={add}
        onClose={() => setAdd(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <div ref={useRef(null)}>
          <R_add open={add} close={() => setAdd(false)} />
        </div>
      </Modal>
    </Box>
  );
};

export default R_content;
