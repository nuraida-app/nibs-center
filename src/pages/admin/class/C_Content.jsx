import { Box, IconButton, Input, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import { blue, red } from "@mui/material/colors";
import { toast } from "react-toastify";

import { useState, useEffect } from "react";
import C_Table from "./C_Table";
import { useDispatch, useSelector } from "react-redux";
import { addClass, getClasses } from "../../../Redux/class/C_action";
import { ADD_CLASS_RESET } from "../../../Redux/class/C_const";

const C_Content = () => {
  const dispatch = useDispatch();

  const { cAddLoad, cIsAdded, cAddSuccess, cAddError } = useSelector(
    (state) => state.c_add
  );

  const { cLoad, classes } = useSelector((state) => state.classes);

  const [searchTerm, setSearchTerm] = useState("");

  const filtered = (data) => {
    return data.class.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filteredClasses = classes?.filter(filtered);

  const serachFunction = (e) => {
    setSearchTerm(e.target.value);
  };

  const [cName, setName] = useState("");

  const createClass = () => {
    if (!cName) {
      toast.error("Please provide a class");
    } else {
      const data = {
        class: cName,
      };

      dispatch(addClass(data));
    }
  };

  useEffect(() => {
    if (cIsAdded) {
      toast.success(cAddSuccess);

      setName("");

      dispatch(getClasses());

      dispatch({ type: ADD_CLASS_RESET });
    } else {
      toast.error(cAddError);

      dispatch({ type: ADD_CLASS_RESET });
    }
  }, [cIsAdded, cAddError, cAddSuccess]);

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
            placeholder="Seacy Class"
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
              placeholder="Add Class"
              value={cName}
              onChange={(e) => setName(e.target.value)}
            />

            <Tooltip title="Add New">
              <IconButton onClick={createClass}>
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

      <C_Table classes={filteredClasses} load={cLoad} />
    </Box>
  );
};

export default C_Content;
