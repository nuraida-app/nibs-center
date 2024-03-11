import {
  Box,
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
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import { blue, red, yellow } from "@mui/material/colors";
import Loader from "../../../component/Loader/Loader";
import { Fragment, useState } from "react";

const columns = [
  { id: "no", label: "No", minWidth: 30 },
  { id: "classroom", label: "Classroom", minWidth: 120 },
  { id: "exam", label: "Exam", minWidth: 120 },
  { id: "grade", label: "Grade", minWidth: 30 },
  { id: "status", label: "Status", minWidth: 80 },
  { id: "schedule", label: "Schedule", minWidth: 80 },
  { id: "code", label: "Code", minWidth: 120 },
  { id: "action", label: "Action", minWidth: 120 },
];

const R_table = ({ rooms, load }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                  ? rooms?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rooms
                )?.map((item, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{item.exam_name}</TableCell>
                    <TableCell align="center">{item.grade}</TableCell>
                    <TableCell align="center">
                      <Typography
                        fontWeight={700}
                        sx={{
                          color:
                            item.status === 1
                              ? blue[700]
                              : item.status === 2
                              ? yellow[800]
                              : red[700],
                        }}
                      >
                        {item.status === 1
                          ? "Not Started"
                          : item.status === 2
                          ? "In Progress"
                          : "Completed"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {new Date(item.date_start).toLocaleDateString("id-ID")} :{" "}
                      {item.time_start}
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontWeight={700} sx={{ color: blue[700] }}>
                        {item.code}
                      </Typography>
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
            count={rooms ? rooms.length : 0}
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

export default R_table;
