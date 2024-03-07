import { Box, IconButton, Input, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import { blue, red } from "@mui/material/colors";
import { toast } from "react-toastify";

import { useEffect, useState } from "react";
import G_Table from "./G_Table";
import { useDispatch, useSelector } from "react-redux";
import { addGrade, getGrades } from "../../../Redux/grade/G_action";
import { ADD_GRADE_RESET } from "../../../Redux/grade/G_const";

const G_Content = () => {
  const dispatch = useDispatch();

  const { gIsAdded, gAddSuccess, gAddError } = useSelector(
    (state) => state.g_add
  );

  const { gLoad, grades } = useSelector((state) => state.grades);

  const [searchTerm, setSearchTerm] = useState("");

  const filtered = (grade) => {
    return grade.grade.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filteredGrades = grades?.filter(filtered);

  const serachFunction = (e) => {
    setSearchTerm(e.target.value);
  };

  const [grade, setGrade] = useState("");

  const createGrade = () => {
    if (!grade) {
      toast.error("Please provide a grade");
    } else {
      const data = {
        grade: grade,
      };

      dispatch(addGrade(data));
    }
  };

  useEffect(() => {
    if (gIsAdded) {
      toast.success(gAddSuccess);

      setGrade("");

      dispatch(getGrades());

      dispatch({ type: ADD_GRADE_RESET });
    } else {
      toast.error(gAddError);
    }
  }, [gIsAdded, gAddError, gAddSuccess]);
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
            placeholder="Seacy Grade"
            value={searchTerm}
            onChange={serachFunction}
          />
        </Box>

        <Box sx={{ display: "flex", gap: "10px" }}>
          <Box
            sx={{
              borderRadius: "5px",
              bgcolor: "#E0E0E0",
              padding: "5px",
            }}
          >
            <Input
              type="text"
              placeholder="Add Grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            />

            <Tooltip title="Add New">
              <IconButton onClick={createGrade}>
                <AddCircleIcon sx={{ color: blue[500] }} />
              </IconButton>
            </Tooltip>
          </Box>

          <Tooltip title="Template">
            <IconButton>
              <FolderDeleteIcon sx={{ color: red[400] }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <G_Table grades={filteredGrades} load={gLoad} />
    </Box>
  );
};

export default G_Content;
