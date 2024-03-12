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
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { red, yellow } from "@mui/material/colors";
import { Fragment, useEffect, useState } from "react";
import Loader from "../../component/Loader/Loader";
import { deleteGrade, getGrades } from "../../../Redux/grade/G_action";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DEL_GRADE_RESET } from "../../../Redux/grade/G_const";

const colums = [
  { id: "id", label: "ID", minWidth: 90 },
  { id: "grade", label: "Grade", minWidth: 170 },
  { id: "action", label: "Action", minWidth: 170 },
];

const G_Table = ({ grades, load }) => {
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

  // DELETE
  const { gDelLoad, gIsDeleted, gDelSuccess, gDelError } = useSelector(
    (state) => state.del_grade
  );

  const delGrade = (id) => dispatch(deleteGrade(id));

  useEffect(() => {
    if (gIsDeleted) {
      toast.success(gDelSuccess);

      dispatch({ type: DEL_GRADE_RESET });

      dispatch(getGrades());
    } else {
      toast.error(gDelError);

      dispatch({ type: DEL_GRADE_RESET });
    }
  }, [gDelLoad, gIsDeleted, gDelSuccess, gDelSuccess]);

  return (
    <Fragment>
      {load || gDelLoad ? (
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
                {(rowsPerPage > 0
                  ? grades?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : grades
                )?.map((item) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={item.grade_id}
                  >
                    <TableCell align="center">{item.grade_id}</TableCell>
                    <TableCell align="center">{item.grade}</TableCell>
                    <TableCell
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: "30%",
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Tooltip title="Delete">
                          <IconButton onClick={() => delGrade(item.grade_id)}>
                            <RemoveCircleIcon sx={{ color: red[500] }} />
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
            count={grades ? grades.length : 0}
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

export default G_Table;
