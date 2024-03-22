import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  Input,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader/Loader";
import { useEffect, useState } from "react";
import { getExamByGrade } from "../../../Redux/exam/E_action";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const columns = [
  { id: 1, label: "No", minWidth: 30 },
  { id: 2, label: "Exam", minWidth: 170 },
  { id: 3, label: "Teacher", minWidth: 170 },
  { id: 4, label: "Date", minWidth: 170 },
  { id: 5, label: "Duration", minWidth: 170 },
  { id: 6, label: "Status", minWidth: 170 },
  { id: 7, label: "Action", minWidth: 30 },
];

const E_list = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthLoading } = useSelector((state) => state.auth);
  const { eg_loading, exams } = useSelector((state) => state.examsByGrade);

  const [searchTerm, setSearchTerm] = useState("");

  const filtering = (exam) => {
    return exam.exam_name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filtered = Array.isArray(exams) ? exams.filter(filtering) : [];

  const searchfunction = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (user) {
      dispatch(getExamByGrade(user?.grade_id));
    }
  }, [user]);

  // Confirm
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [code, setCode] = useState("");
  const [inputCode, setInputCode] = useState("");

  const confirm = (id, name, grade, code) => {
    setOpen(true);
    setId(id);
    setName(name);
    setGrade(grade);
    setCode(code);
  };

  // Start
  const startExam = () => {
    if (code === inputCode) {
      navigate(`/start-exam/${id}/${name}/grade/${grade}`);
    } else {
      toast.error("Code is not valid");
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        minHeight: 690,
        borderRadius: "5px",
        p: 2,
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
          mb: 2,
        }}
      >
        <SearchIcon />

        <Input
          fullWidth
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={searchfunction}
        />
      </Box>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 625 }}>
          {eg_loading ? (
            <Loader />
          ) : (
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((item) => (
                    <TableCell
                      align="center"
                      key={item.id}
                      style={{ minWidth: item.minWidth }}
                    >
                      {item.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filtered?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell>{item.exam_name}</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">
                      {item.date_start
                        ? new Date(item.date_start).toLocaleDateString("id-ID")
                        : "-"}
                    </TableCell>
                    <TableCell align="center">{item.time} Minutes</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Start">
                        <IconButton
                          onClick={() =>
                            confirm(
                              item._id,
                              item.exam_name,
                              item.grade,
                              item.code
                            )
                          }
                        >
                          <PlayCircleFilledIcon sx={{ color: red[800] }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Paper>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "white",
              p: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
              gap: 3,
            }}
          >
            <Input
              fullWidth
              type="text"
              placeholder="Enter Code"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
            />
            <Button variant="contained" color="error" onClick={startExam}>
              verify
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default E_list;
