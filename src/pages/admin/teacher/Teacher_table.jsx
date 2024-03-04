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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import { red, yellow } from "@mui/material/colors";
import { Fragment, useState } from "react";
import Loader from "../../component/Loader/Loader";

const colums = [
  { id: "nip", label: "NIP", minWidth: 90 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "name", label: "Subject", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "phone", label: "Phone", minWidth: 170 },

  { id: "action", label: "Action", minWidth: 170 },
];

const Teacher_table = ({ teachers, load }) => {
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
          <TableContainer sx={{ maxHeight: 650 }}>
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
            count={teachers ? teachers.length : 0}
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

export default Teacher_table;
