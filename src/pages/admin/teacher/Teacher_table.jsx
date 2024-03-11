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
import { Fragment, useState, useRef } from "react";
import Loader from "../../component/Loader/Loader";
import { useDispatch } from "react-redux";
import { getTeacherDetail } from "../../../Redux/user/T_action";
import T_Add from "./T_Add";

const colums = [
  { id: "nip", label: "NIP", minWidth: 90 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "name", label: "Subject", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "phone", label: "Phone", minWidth: 170 },

  { id: "action", label: "Action", minWidth: 170 },
];

const Teacher_table = ({ teachers, load }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [edit, setEdit] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getDetail = (id) => {
    setEdit(true);

    dispatch(getTeacherDetail(id));
  };

  return (
    <Fragment>
      {load ? (
        <Box
          sx={{
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
                  {colums.map((column, index) => (
                    <TableCell
                      key={index}
                      align="center"
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {teachers?.map((teacher, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align="center">{teacher.nip}</TableCell>
                    <TableCell align="center">{teacher.name}</TableCell>
                    <TableCell align="center">{teacher.subject}</TableCell>
                    <TableCell align="center">
                      {teacher.email ? teacher.email : "-"}
                    </TableCell>
                    <TableCell align="center">
                      {teacher.phone_number ? teacher.phone_number : "-"}
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
                          <IconButton onClick={() => getDetail(teacher._id)}>
                            <EditIcon sx={{ color: yellow[800] }} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Remove">
                          <IconButton>
                            <PersonRemoveAlt1Icon sx={{ color: red[500] }} />
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
            count={teachers ? teachers.length : 0}
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
          <T_Add open={edit} close={() => setEdit(false)} />
        </div>
      </Modal>
    </Fragment>
  );
};

export default Teacher_table;
