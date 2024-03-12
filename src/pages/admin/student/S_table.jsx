import {
  Backdrop,
  Box,
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import { red, yellow } from "@mui/material/colors";
import { Fragment, useEffect, useRef, useState } from "react";
import Loader from "../../component/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStudent,
  getStudentDetail,
  getStudents,
} from "../../../Redux/user/S_action";
import { toast } from "react-toastify";
import { DEL_STUDENT_RESET } from "../../../Redux/user/S_const";
import S_add from "./S_add";

const columns = [
  { id: "nis", label: "NIS", minWidth: 90 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "grade", label: "Grade", minWidth: 170 },
  { id: "class", label: "Class", minWidth: 170 },
  { id: "action", label: "Action", minWidth: 170 },
];

const S_table = ({ students, load }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getDetail = (id) => {
    dispatch(getStudentDetail(id));

    setEdit(true);
  };

  // DELETE
  const { sUpDelLoad, sIsDeleted, sDelMsg, sDelError } = useSelector(
    (state) => state.st_updel
  );

  const [edit, setEdit] = useState(false);

  const delStudent = (id) => dispatch(deleteStudent(id));

  useEffect(() => {
    if (sIsDeleted) {
      toast.success(sDelMsg);

      dispatch(getStudents());

      dispatch({ type: DEL_STUDENT_RESET });
    } else {
      toast.error(sDelError);

      dispatch({ type: DEL_STUDENT_RESET });
    }
  }, [sIsDeleted, sDelMsg, sDelError]);

  return (
    <Fragment>
      {load || sUpDelLoad ? (
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
                  ? students?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : students
                )?.map((student, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align="center">{student.nis}</TableCell>
                    <TableCell align="center">{student.name}</TableCell>
                    <TableCell align="center">{student.grade}</TableCell>
                    <TableCell align="center">{student.class}</TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          gap: "20px",
                          justifyContent: "center",
                        }}
                      >
                        <Tooltip title="Edit">
                          <IconButton onClick={() => getDetail(student._id)}>
                            <EditIcon sx={{ color: yellow[800] }} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Remove">
                          <IconButton onClick={() => delStudent(student._id)}>
                            <PersonRemoveAlt1Icon sx={{ color: red[800] }} />
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
            count={students ? students.length : 0}
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
          <S_add open={edit} close={() => setEdit(false)} />
        </div>
      </Modal>
    </Fragment>
  );
};

export default S_table;
