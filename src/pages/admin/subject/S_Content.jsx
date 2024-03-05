import { Box, IconButton, Input, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import { blue, red } from "@mui/material/colors";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import S_Table from "./S_Table";
import { addSubject, getSubjects } from "../../../Redux/subject/S_action";
import { toast } from "react-toastify";
import { ADD_SUBJECT_RESET } from "../../../Redux/subject/S-Const";

const S_Content = () => {
  const dispatch = useDispatch(useState);

  const { subjects, sLoad } = useSelector((state) => state.subjects);
  const { sIsAdded, sAddSuccess, sAddError } = useSelector(
    (state) => state.s_add
  );

  const [searchTerm, setSearchTerm] = useState("");

  const filtered = (subject) => {
    return subject.subject.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filteredSubjects = subjects?.filter(filtered);

  const serachFunction = (e) => {
    setSearchTerm(e.target.value);
  };

  const [sName, setName] = useState("");

  const createSubject = () => {
    if (!sName) {
      toast.error("Please provide a subject");
    } else {
      const data = {
        subject: sName,
      };
      dispatch(addSubject(data));
    }
  };

  useEffect(() => {
    if (sIsAdded) {
      toast.success(sAddSuccess);

      dispatch(getSubjects());

      dispatch({ type: ADD_SUBJECT_RESET });
    } else {
      toast.error(sAddError);

      dispatch({ type: ADD_SUBJECT_RESET });
    }
  }, [sIsAdded, sAddSuccess, sAddError]);

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
            placeholder="Seacy Subject"
            onChange={serachFunction}
            value={searchTerm}
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
              placeholder="Add Subject"
              value={sName}
              onChange={(e) => setName(e.target.value)}
            />

            <Tooltip title="Add New">
              <IconButton onClick={createSubject}>
                <AddCircleIcon sx={{ color: blue[500] }} />
              </IconButton>
            </Tooltip>
          </Box>

          <Tooltip title="Clear">
            <IconButton>
              <FolderDeleteIcon sx={{ color: red[400] }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <S_Table subjects={filteredSubjects} load={sLoad} />
    </Box>
  );
};

export default S_Content;
