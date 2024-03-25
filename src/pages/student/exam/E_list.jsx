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
  Typography,
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
import { createLog } from "../../../Redux/logs/Log_action";

const columns = [
  { id: 1, label: "No", minWidth: 30 },
  { id: 2, label: "Exam", minWidth: 170 },
  { id: 3, label: "Teacher", minWidth: 170 },
  { id: 4, label: "Start", minWidth: 170 },
  { id: 5, label: "End", minWidth: 170 },
  { id: 6, label: "Duration", minWidth: 170 },
  { id: 7, label: "Status", minWidth: 170 },
  { id: 8, label: "Action", minWidth: 30 },
];

const E_list = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthLoading } = useSelector((state) => state.auth);
  const { eg_loading, exams } = useSelector((state) => state.examsByGrade);
  const { logLoading, logSuccess, logMsg, logError } = useSelector(
    (state) => state.createLog
  );

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
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const confirm = (id, name, grade, code, start, end) => {
    setOpen(true);
    setId(id);
    setName(name);
    setGrade(grade);
    setCode(code);
    setStart(start);
    setEnd(end);
  };

  // Start
  const startExam = () => {
    if (code === inputCode) {
      const data = {
        student: user?.nis,
        exam: id,
      };

      dispatch(createLog(data));
    } else {
      toast.error("Code is not valid");
    }
  };

  useEffect(() => {
    if (logSuccess) {
      navigate(`/start-exam/${id}/${name}/grade/${grade}/${start}/${end}`);

      console.log(logMsg);
    } else {
      console.log(logError);
    }
  }, [logSuccess, logMsg, logError, id, name, grade, navigate]);

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
                  <TableRow key={index} hover>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell>{item.exam_name}</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">
                      {item.date_start
                        ? new Date(item.date_start).toLocaleDateString(
                            "id-ID",
                            { hour: "numeric", minute: "numeric" }
                          )
                        : "-"}
                    </TableCell>
                    <TableCell align="center">
                      {item.date_start
                        ? new Date(item.date_end).toLocaleDateString("id-ID", {
                            hour: "numeric",
                            minute: "numeric",
                          })
                        : "-"}
                    </TableCell>
                    <TableCell align="center">{item.time} Minutes</TableCell>
                    <TableCell align="center">
                      <Typography fontWeight={700}>
                        {new Date(item.date_start) > new Date()
                          ? "Not started"
                          : new Date(item.date_end) < new Date()
                          ? "Finished"
                          : "Started"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Start">
                        <IconButton
                          onClick={() =>
                            confirm(
                              item._id,
                              item.exam_name,
                              item.grade,
                              item.code,
                              item.date_start,
                              item.date_end
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
            {logLoading ? (
              <Loader />
            ) : (
              <>
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
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default E_list;
