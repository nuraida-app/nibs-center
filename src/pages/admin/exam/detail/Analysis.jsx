import {
  Box,
  Button,
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
import Loader from "../../../component/Loader/Loader";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Fragment, useState } from "react";

const columns = [
  { id: "1", label: "No", minWidth: 30 },
  { id: "2", label: "NIS", minWidth: 100 },
  { id: "3", label: "Name", minWidth: 175 },
  { id: "5", label: "Class", minWidth: 30 },
];

const Analysis = ({ eload, sLoad, students, exam, answers }) => {
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

  const filtered = students?.filter(filtering);

  const serachFunction = (e) => {
    setSearchTerm(e.target.value);
  };

  const mc = exam?.questions.filter((item) => item.quiz_type === 1);

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
          justifyContent: "space-between",
          alignItems: "center",
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
            width: "88%",
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

        <Button
          variant="contained"
          color="info"
          startIcon={<CloudDownloadIcon />}
          sx={{ height: 40, mr: 4 }}
        >
          Export
        </Button>
      </Box>

      {eload || sLoad ? (
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
                      rowSpan={2}
                    >
                      {item.label}
                    </TableCell>
                  ))}

                  {mc?.map((item, index) => (
                    <TableCell key={item._id}>{index + 1}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  {mc?.map((item) => (
                    <TableCell key={item._id} align="center">
                      {item.key}
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
                  // Temukan jawaban untuk siswa ini

                  const mcAnswers = answers?.filter(
                    (item) =>
                      item.quiz_type === 1 && item.nis === Number(student.nis)
                  );

                  return (
                    <Fragment key={student._id}>
                      <TableRow hover>
                        <TableCell rowSpan={2} align="center">
                          {index + 1}
                        </TableCell>
                        <TableCell rowSpan={2} align="center">
                          {student.nis}
                        </TableCell>
                        <TableCell rowSpan={2}>{student.name}</TableCell>
                        <TableCell rowSpan={2} align="center">
                          {student.class}
                        </TableCell>
                        {mc.map((item) => (
                          <TableCell key={item._id}>
                            {
                              mcAnswers.find((ans) => ans.quiz_id === item._id)
                                ?.mc
                            }
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        {mc.map((item) => (
                          <TableCell key={item._id}>
                            {mcAnswers.find((ans) => ans.quiz_id === item._id)
                              ?.mc === item.key
                              ? 1
                              : 0}
                          </TableCell>
                        ))}
                      </TableRow>
                    </Fragment>
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

export default Analysis;
