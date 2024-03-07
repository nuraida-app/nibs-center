import {
  Box,
  Button,
  IconButton,
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
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { red, yellow } from "@mui/material/colors";
import { Fragment, useState } from "react";
import Loader from "../../component/Loader/Loader";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "name", label: "Exam Name", minWidth: 170 },
  { id: "teacher", label: "Teacher", minWidth: 170 },
  { id: "subject", label: "Subject", minWidth: 170 },
  { id: "time", label: "Time", minWidth: 70 },
  { id: "pg", label: "MC", minWidth: 70 },
  { id: "essay", label: "Essay", minWidth: 70 },
  { id: "questions", label: "Questions", minWidth: 70 },
  { id: "action", label: "Action", minWidth: 170 },
];

const E_table = ({ exams, load }) => {
  const navigate = useNavigate();

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

  return (
    <Fragment>
      {load ? (
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
                    <TableCell align="center">{item.subject}</TableCell>
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
                          <IconButton>
                            <EditIcon sx={{ color: yellow[800] }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Remove">
                          <IconButton>
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
    </Fragment>
  );
};

export default E_table;
