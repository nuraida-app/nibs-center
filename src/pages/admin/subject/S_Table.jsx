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
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { red, yellow } from "@mui/material/colors";
import { Fragment, useEffect, useState } from "react";
import Loader from "../../component/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubject, getSubjects } from "../../../Redux/subject/S_action";
import { toast } from "react-toastify";
import { DEL_SUBJECT_RESET } from "../../../Redux/subject/S-Const";

const colums = [
  { id: "id", label: "ID", minWidth: 90 },
  { id: "subject", label: "Subject", minWidth: 170 },
  { id: "action", label: "Action", minWidth: 170 },
];

const S_Table = ({ subjects, load }) => {
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
  const dispatch = useDispatch();

  const { sDelLoad, sIsDeleted, sDelSuccess, sDelError } = useSelector(
    (state) => state.s_del
  );

  const delSubject = (id) => dispatch(deleteSubject(id));

  useEffect(() => {
    if (sIsDeleted) {
      toast.success(sDelSuccess);

      dispatch(getSubjects());

      dispatch({ type: DEL_SUBJECT_RESET });
    } else {
      toast.error(sDelError);

      dispatch({ type: DEL_SUBJECT_RESET });
    }
  }, [sIsDeleted, sDelSuccess, sDelError]);

  return (
    <Fragment>
      {load || sDelLoad ? (
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
                {subjects?.map((item) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={item.subject_id}
                  >
                    <TableCell align="center">{item.subject_id}</TableCell>
                    <TableCell align="center">{item.subject}</TableCell>
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
                          <IconButton
                            onClick={() => delSubject(item.subject_id)}
                          >
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
            count={subjects ? subjects.length : 0}
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

export default S_Table;
