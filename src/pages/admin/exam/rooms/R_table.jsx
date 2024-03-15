import {
  Backdrop,
  Box,
  Button,
  Fade,
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
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { blue, red, yellow } from "@mui/material/colors";
import Loader from "../../../component/Loader/Loader";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRoom,
  detailRoom,
  getRooms,
} from "../../../../Redux/exam/E_action";
import { toast } from "react-toastify";
import { DEL_ROOM_RESET } from "../../../../Redux/exam/E_const";
import R_Update from "./R_Update";

const columns = [
  { id: "no", label: "No", minWidth: 30 },
  { id: "classroom", label: "Classroom", minWidth: 120 },
  { id: "teacher", label: "Teacher", minWidth: 120 },
  { id: "exam", label: "Exam", minWidth: 120 },
  { id: "grade", label: "Grade", minWidth: 30 },
  { id: "status", label: "Status", minWidth: 80 },
  { id: "schedule", label: "Schedule", minWidth: 80 },
  { id: "code", label: "Code", minWidth: 120 },
  { id: "action", label: "Action", minWidth: 120 },
];

const R_table = ({ rooms, load }) => {
  // GLOBAL
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

  // UPPDATE
  const [update, setUpdate] = useState(false);

  const upHandler = (id) => {
    setUpdate(true);

    dispatch(detailRoom(id));
  };

  // DELETE
  const { rUpdelLoad, rIsDeleted, rDelMsg, rDelError } = useSelector(
    (state) => state.r_updel
  );

  const [del, setDel] = useState(false);
  const [rId, setR] = useState("");

  const confirm = (id) => {
    setDel(true);
    setR(id);
  };

  const delRoom = (id) => dispatch(deleteRoom(id));

  useEffect(() => {
    if (rIsDeleted) {
      toast.success(rDelMsg);

      dispatch({ type: DEL_ROOM_RESET });

      dispatch(getRooms());

      setDel(false);
    } else {
      toast.error(rDelError);

      dispatch({ type: DEL_ROOM_RESET });
    }
  }, [rIsDeleted, rDelMsg, rDelError]);

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
                    <TableCell align="center">{item.room_name}</TableCell>
                    <TableCell align="center">{item.teacher_name}</TableCell>
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
                      {item.date_start && item.time_start
                        ? `${new Date(item.date_start).toLocaleDateString(
                            "id-ID"
                          )} : ${item.time_start}`
                        : "-"}
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
                          <IconButton onClick={() => upHandler(item.id)}>
                            <EditIcon sx={{ color: yellow[800] }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Remove">
                          <IconButton onClick={() => confirm(item.id)}>
                            <BookmarkRemoveIcon sx={{ color: red[500] }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Detail">
                          <IconButton>
                            <ArrowCircleRightIcon sx={{ color: blue[500] }} />
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

      <Modal
        open={del}
        onClose={() => setDel(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={del}>
          {rUpdelLoad ? (
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
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "#ffff",
                boxShadow: 24,
                p: 2,
                borderRadius: "5px",
              }}
            >
              <>
                <Typography align="center">
                  By deleting this room, it will delete all related data
                </Typography>
                <Typography align="center">
                  such as scores, answer analysis, penalty and log
                </Typography>
                <Typography align="center">
                  Besure to download report sheet before continuing this process
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "10px",
                    mt: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => setDel(false)}
                  >
                    cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => delRoom(rId)}
                  >
                    delete
                  </Button>
                </Box>
              </>
            </Box>
          )}
        </Fade>
      </Modal>

      <R_Update open={update} close={() => setUpdate(false)} />
    </Fragment>
  );
};

export default R_table;
