import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExamByGrade } from "../../../Redux/exam/E_action";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { user, isAuthLoading } = useSelector((state) => state.auth);
  const { eg_loading, exams } = useSelector((state) => state.examsByGrade);

  useEffect(() => {
    if (user) {
      dispatch(getExamByGrade(user?.grade_id));
    }
  }, [user]);

  return (
    <Box
      sx={{
        bgcolor: "white",
        minHeight: 690,
        borderRadius: "5px",
        p: 2,
        display: "flex",
      }}
    >
      {/* Profile */}
      <Box sx={{ flex: 1, p: 1 }}>
        {isAuthLoading ? null : (
          <Paper>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>NIS</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>{user?.nis}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>{user?.name}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Grade</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>{user?.grade}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Class</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>{user?.class}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Box>

      {/* Info */}
      <Box
        sx={{ flex: 1, p: 1, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h6">Exam List</Typography>
        {eg_loading ? null : (
          <Paper>
            <TableContainer>
              <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>Teacher</TableCell>
                      <TableCell>Exam</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {exams?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.exam_name}</TableCell>
                        <TableCell>{item.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TableContainer>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
