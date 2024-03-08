import {
  Backdrop,
  Box,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import UploadIcon from "@mui/icons-material/Upload";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { blue, green, red } from "@mui/material/colors";

import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import S_upload from "./S_upload";
import S_add from "./S_add";
import S_table from "./S_table";

const S_content = () => {
  const { students, sLoad } = useSelector((state) => state.students);
  const { grades } = useSelector((state) => state.grades);
  const { classes } = useSelector((state) => state.classes);

  const [openUpload, setUpload] = useState(false);
  const [openAdd, setAdd] = useState(false);

  const [gName, setG] = useState("");
  const [cName, setC] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const filtering = (user) => {
    const byName = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const byGrade = gName === "" || user.grade === gName;
    const byClass = cName === "" || user.class === cName;
    return byName && byGrade && byClass;
  };

  const cFiltering = (className) => {
    return className.class.toLowerCase().includes(gName.toLowerCase());
  };

  const filteredClasses = classes?.filter(cFiltering);

  const filteredStudents = students?.filter(filtering);

  const serachFunction = (e) => {
    setSearchTerm(e.target.value);
  };

  const donwload = () => {
    window, open("/students_templete.xlsx", "_blank");
  };

  const reset = () => {
    setSearchTerm("");
    setG("");
    setC("");
  };

  return (
    <Box>
      {/* FUNCTION */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "whitesmoke",
          borderRadius: "5px",
          mb: 2,
          p: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
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

            <Input
              type="text"
              placeholder="Seacy By Name"
              onChange={serachFunction}
              value={searchTerm}
            />
          </Box>

          <FormControl sx={{ width: 120 }}>
            <InputLabel>Grade</InputLabel>
            <Select
              value={gName}
              onChange={(e) => setG(e.target.value)}
              label="Grade"
            >
              <MenuItem>Test</MenuItem>
              {grades?.map((item) => (
                <MenuItem key={item.grade_id} value={item.grade}>
                  {item.grade}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: 120 }}>
            <InputLabel>Class</InputLabel>
            <Select
              value={cName}
              onChange={(e) => setC(e.target.value)}
              label="Class"
            >
              {filteredClasses?.map((item) => (
                <MenuItem key={item.class_id} value={item.class}>
                  {item.class}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Tooltip title="Reset">
            <IconButton sx={{ height: 40 }} onClick={reset}>
              <RestartAltIcon sx={{ color: red[800] }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ display: "flex", gap: "10px", height: 40 }}>
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

      <S_table students={filteredStudents} load={sLoad} />

      <Modal
        open={openUpload}
        onClose={() => setUpload(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <div ref={useRef(null)}>
          <S_upload open={openUpload} close={() => setUpload(false)} />
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
          <S_add open={openAdd} close={() => setAdd(false)} />
        </div>
      </Modal>
    </Box>
  );
};

export default S_content;
