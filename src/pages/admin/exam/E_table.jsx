import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { red, yellow } from "@mui/material/colors";
import { Fragment, useEffect, useRef, useState } from "react";
import Loader from "../../component/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteExam, getExam, getExams } from "../../../Redux/exam/E_action";
import E_add from "./E_add";
import { toast } from "react-toastify";
import { DEL_EXAM_RESET } from "../../../Redux/exam/E_const";

const columns = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "name", label: "Exam Name", minWidth: 170 },
  { id: "teacher", label: "Teacher", minWidth: 170 },
  { id: "time", label: "Time", minWidth: 70 },
  { id: "pg", label: "MC", minWidth: 70 },
  { id: "essay", label: "Essay", minWidth: 70 },
  { id: "questions", label: "Questions", minWidth: 70 },
  { id: "action", label: "Action", minWidth: 170 },
];

const E_table = ({ exams, load }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const toAddQues = (id, name) => navigate(`/center/admin/exam/${id}/${name}`);

  const getDetail = (id) => {
    dispatch(getExam(id));
    setEdit(true);
  };

  // DELETE
  const delExam = (id) => dispatch(deleteExam(id));

  const [delOpen, setDelopen] = useState(false);
  const [exam_id, setId] = useState("");

  const confirmDelete = (id) => {
    setDelopen(true);
    setId(id);
  };

  const { updelLoad, eIsDeleted, eDelMsg, eDelError } = useSelector(
    (state) => state.e_updel
  );

  useEffect(() => {
    if (eIsDeleted) {
      toast.success(eDelMsg);

      dispatch(getExams());

      dispatch({ type: DEL_EXAM_RESET });

      setDelopen(false);
    } else {
      toast.error(eDelError);

      dispatch({ type: DEL_EXAM_RESET });
    }
  }, [eIsDeleted, eDelMsg, eDelError]);

  return (
    <Fragment>
      {load || updelLoad ? (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
        </Box>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 625 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="center"
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? exams?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : exams
                )?.map((item, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{item.exam_name}</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{item.time} Minutes</TableCell>
                    <TableCell align="center">
                      {item.type_1 ? item.type_1 : 0}
                    </TableCell>
                    <TableCell align="center">
                      {item.type_2 ? item.type_2 : 0}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => toAddQues(item._id, item.exam_name)}
                      >
                        detail
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          gap: "20px",
                          justifyContent: "center",
                        }}
                      >
                        <Tooltip title="Edit">
                          <IconButton onClick={() => getDetail(item._id)}>
                            <EditIcon sx={{ color: yellow[800] }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Remove">
                          <IconButton onClick={() => confirmDelete(item._id)}>
                            <BookmarkRemoveIcon sx={{ color: red[500] }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100, 200]}
            component="div"
            count={exams ? exams.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}

      <Modal
        open={edit}
        onClose={() => setEdit(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <div ref={useRef(null)}>
          <E_add open={edit} close={() => setEdit(false)} />
        </div>
      </Modal>

      <Modal
        open={delOpen}
        onClose={() => setDelopen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={delOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "#ffff",
              boxShadow: 24,
              p: 2,
              borderRadius: "5px",
            }}
          >
            {updelLoad ? (
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Loader />
              </Box>
            ) : (
              <Box>
                <Typography align="center">
                  By deleting this exam, it will delete all questions, students'
                  answer and score
                </Typography>
                <Typography align="center">
                  Besure to download answer and score sheet before continuing
                  this process
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "10px",
                    mt: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => setDelopen(false)}
                  >
                    cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => delExam(exam_id)}
                  >
                    delete
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </Fragment>
  );
};

export default E_table;
