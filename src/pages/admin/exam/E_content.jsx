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
import E_add from "./E_add";
import { useDispatch, useSelector } from "react-redux";
import E_table from "./E_table";
import { getExams } from "../../../Redux/exam/E_action";

const E_content = () => {
  const dispatch = useDispatch();

  const { exams, eload } = useSelector((state) => state.exams);

  const [add, setAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = (exam) => {
    return exam.exam_name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const examFiltered = exams?.filter(filtered);

  const searchfunction = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dispatch(getExams());
  }, []);

  return (
    <Box
      sx={{
        minHeight: 790,
        bgcolor: "#fff",
        borderRadius: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* FUNCTION */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
            placeholder="Search by Name"
            value={searchTerm}
            onChange={searchfunction}
          />
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

      <E_table exams={examFiltered} load={eload} />

      <Modal
        open={add}
        onClose={() => setAdd(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <div ref={useRef(null)}>
          <E_add open={add} close={() => setAdd(false)} />
        </div>
      </Modal>
    </Box>
  );
};

export default E_content;
