import {
  Backdrop,
  Box,
  IconButton,
  Input,
  Modal,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import UploadIcon from "@mui/icons-material/Upload";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import { blue, green, red } from "@mui/material/colors";
import Teacher_table from "./Teacher_table";

import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import T_Upload from "./T_Upload";
import T_Add from "./T_Add";

const Teacher_content = () => {
  const { teachers, tLoad } = useSelector((state) => state.teachers);

  const [openUpload, setUpload] = useState(false);
  const [openAdd, setAdd] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const filtered = (user) => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filteredTeachers = teachers?.filter(filtered);

  const serachFunction = (e) => {
    setSearchTerm(e.target.value);
  };

  const donwload = () => {
    window, open("/teacher_template.xlsx", "_blank");
  };

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
          p: 2,
        }}
      >
        {/* SEARCh */}
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

          <Input
            type="text"
            placeholder="Seacy By Name"
            onChange={serachFunction}
            value={searchTerm}
          />
        </Box>

        <Box sx={{ display: "flex", gap: "10px" }}>
          <Tooltip title="Upload">
            <IconButton onClick={() => setUpload(true)}>
              <UploadIcon sx={{ color: green[400] }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Add New">
            <IconButton onClick={() => setAdd(true)}>
              <AddCircleIcon sx={{ color: blue[500] }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Template">
            <IconButton onClick={donwload}>
              <SimCardDownloadIcon sx={{ color: red[400] }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Teacher_table teachers={filteredTeachers} load={tLoad} />

      <Modal
        open={openUpload}
        onClose={() => setUpload(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <div ref={useRef(null)}>
          <T_Upload open={openUpload} close={() => setUpload(false)} />
        </div>
      </Modal>

      <Modal
        open={openAdd}
        onClose={() => setAdd(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <div ref={useRef(null)}>
          <T_Add open={openAdd} close={() => setAdd(false)} />
        </div>
      </Modal>
    </Box>
  );
};

export default Teacher_content;
