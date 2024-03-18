import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Loader from "../../../component/Loader/Loader";
import { red } from "@mui/material/colors";

const Indentity = ({ room, load }) => {
  return (
    <Box
      sx={{
        bgcolor: "whitesmoke",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: 2,
        flexWrap: "wrap",
        p: 2,
        borderRadius: "5px",
      }}
    >
      {load ? (
        <Box
          sx={{
            height: 190,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
        </Box>
      ) : (
        <>
          <Table sx={{ width: "45%" }}>
            <TableBody>
              <TableRow>
                <TableCell>Classroom</TableCell>
                <TableCell align="center">:</TableCell>
                <TableCell>{room?.room_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Exam</TableCell>
                <TableCell align="center">:</TableCell>
                <TableCell>{room?.exam_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align="center">:</TableCell>
                <TableCell>{room?.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Grade</TableCell>
                <TableCell align="center">:</TableCell>
                <TableCell>{room?.grade}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table sx={{ width: "45%" }}>
            <TableBody>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell align="center">:</TableCell>
                <TableCell>
                  <Typography fontWeight={700} sx={{ color: red[800] }}>
                    {room?.code}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Teacher</TableCell>
                <TableCell align="center">:</TableCell>
                <TableCell>{room?.teacher_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="center">:</TableCell>
                <TableCell>
                  {new Date(room?.date_start).toLocaleDateString("id-ID")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell align="center">:</TableCell>
                <TableCell>{room?.time_start}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </>
      )}
    </Box>
  );
};

export default Indentity;
