import {
  Box,
  IconButton,
  Input,
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
import SearchIcon from "@mui/icons-material/Search";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { orange, red } from "@mui/material/colors";
import Loader from "../../../component/Loader/Loader";
import { useState } from "react";
import { useSelector } from "react-redux";

const columns = [
  { id: "1", label: "No", minWidth: 30 },
  { id: "2", label: "NIS", minWidth: 100 },
  { id: "3", label: "Name", minWidth: 175 },
  { id: "5", label: "Class", minWidth: 30 },
  { id: "6", label: "Start", minWidth: 100 },
  { id: "7", label: "IP", minWidth: 100 },
  { id: "8", label: "Browser", minWidth: 100 },
  { id: "9", label: "Violation", minWidth: 60 },
  { id: "10", label: "Action", minWidth: 130 },
];

const Students = ({ load, data }) => {
  const { logs, getLog } = useSelector((state) => state.logs);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // SEARCH FUNCTION

  const [searchTerm, setSearchTerm] = useState("");

  const filtering = (user) => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filtered = data?.filter(filtering);

  const serachFunction = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Box
      sx={{
        mt: 2,
        borderRadius: "5px",
        minHeight: 355,
        bgcolor: "whitesmoke",
        p: 1,
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
        }}
      >
        <SearchIcon />

        <Input
          sx={{ width: "98%" }}
          type="text"
          placeholder="Seacy By Name"
          onChange={serachFunction}
          value={searchTerm}
        />
      </Box>

      {load || getLog ? (
        <Loader />
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden", mt: 2 }}>
          <TableContainer sx={{ maxHeight: 625 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((item) => (
                    <TableCell
                      key={item.id}
                      align="center"
                      style={{ minWidth: item.minWidth }}
                    >
                      {item.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filtered?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filtered
                )?.map((student, index) => {
                  const log = logs?.find(
                    (log) => log.student === Number(student.nis)
                  );

                  return (
                    <TableRow key={student._id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{student.nis}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell align="center">{student.class}</TableCell>
                      <TableCell align="center">
                        {log
                          ? new Date(log.date).toLocaleDateString("id-ID", {
                              hour: "numeric",
                              minute: "numeric",
                            })
                          : "-"}
                      </TableCell>
                      <TableCell align="center">{log ? log.ip : "-"}</TableCell>
                      <TableCell align="center">
                        {log ? log.browser : "-"}
                      </TableCell>
                      <TableCell align="center">-</TableCell>
                      <TableCell align="center">
                        <Box>
                          <Tooltip title="Unlock">
                            <IconButton sx={{ color: red[800] }}>
                              <KeyOffIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Reset">
                            <IconButton sx={{ color: orange[800] }}>
                              <RestartAltIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100, 200]}
            component="div"
            count={filtered ? filtered.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Box>
  );
};

export default Students;
