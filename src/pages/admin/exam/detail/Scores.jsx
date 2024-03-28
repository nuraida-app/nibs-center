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
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Loader from "../../../component/Loader/Loader";
import { useState } from "react";
import { useSelector } from "react-redux";

const Scores = ({ sLoad, students }) => {
  const { scoreLoading, scores } = useSelector((state) => state.scores);
  const { exam_detail: exam, detail_Loading: load } = useSelector(
    (state) => state.exams
  );

  const columns = [
    { id: "1", label: "No", minWidth: 20 },
    { id: "2", label: "NIS", minWidth: 100 },
    { id: "3", label: "Name", minWidth: 175 },
    { id: "5", label: "Class", minWidth: 30 },
    { id: "6", label: "Correct", minWidth: 30 },
    { id: "7", label: "Wrong", minWidth: 30 },
    { id: "8", label: `MC ${exam.pg}%`, minWidth: 30 },
    { id: "9", label: `Essay ${exam.essay}%`, minWidth: 30 },
    { id: "10", label: "Total", minWidth: 30 },
  ];

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

      {sLoad || scoreLoading || load ? (
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
                  const score = scores?.find(
                    (score) => score.nis === Number(student.nis)
                  );

                  return (
                    <TableRow key={student._id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{student.nis}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell align="center">{student.class}</TableCell>
                      <TableCell align="center">
                        {score ? score.correct_answer : 0}
                      </TableCell>
                      <TableCell align="center">
                        {score ? score.wrong_answer : 0}
                      </TableCell>
                      <TableCell align="center">
                        {score ? score.mcScore.toFixed(2) : 0}
                      </TableCell>
                      <TableCell align="center">
                        {score ? score.essayScore.toFixed(2) : 0}
                      </TableCell>
                      <TableCell align="center">
                        {score ? score.totalScore.toFixed(2) : 0}
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

export default Scores;
