import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../component/Loader/Loader";
import { toast } from "react-toastify";
import { UP_ROOM_RESET } from "../../../../Redux/exam/E_const";
import { getRooms, updateRoom } from "../../../../Redux/exam/E_action";

const R_Update = ({ open, close }) => {
  const dispatch = useDispatch();

  const { rDetailLoad, room } = useSelector((state) => state.rooms);
  const { exams, eLoad } = useSelector((state) => state.exams);

  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [tId, setT] = useState("");
  const [eId, setE] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [selectedExam, setSelectedExam] = useState("");

  const handleExamSelect = (e) => {
    const selectedExamId = e.target.value; // mengambil id ujian yang dipilih
    setSelectedExam(selectedExamId); // menyimpan id ujian yang dipilih

    // Anda mungkin perlu mencari ujian yang dipilih dari array exams
    const selectedExamData = exams.find((item) => item._id === selectedExamId);

    // Mengambil teacher_id dan _id ujian yang dipilih
    const { teacher_id, _id } = selectedExamData;

    // Menyimpan teacher_id dan _id ke dalam state
    setT(teacher_id);
    setE(_id);
  };

  const handleDateTimeChange = (newDateTime) => {
    const dateObj = new Date(newDateTime);

    // Mendapatkan offset zona waktu dalam menit
    const timezoneOffset = dateObj.getTimezoneOffset();

    // Menambahkan offset zona waktu agar waktu yang diambil sesuai dengan zona waktu yang dipilih
    dateObj.setMinutes(dateObj.getMinutes() - timezoneOffset);

    // Mengambil bagian-bagian dari tanggal
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Tambahkan padding nol jika perlu
    const day = String(dateObj.getDate()).padStart(2, "0"); // Tambahkan padding nol jika perlu

    // Menggabungkan kembali ke dalam format yang diinginkan
    const formattedDate = `${day}-${month}-${year}`;

    // Ambil waktu dalam format HH:MM
    const formattedTime = dateObj.toISOString().slice(11, 16);

    // Set state tanggal dan waktu
    setDate(formattedDate);
    setTime(formattedTime);
  };

  let formattedOldDate = "";
  if (room?.date_start) {
    const oldDate = new Date(room.date_start);
    const year = oldDate.getFullYear();
    const month = String(oldDate.getMonth() + 1).padStart(2, "0");
    const day = String(oldDate.getDate()).padStart(2, "0");
    formattedOldDate = `${day}-${month}-${year}`;
  }

  const updateHandler = (e) => {
    e.preventDefault();

    const data = {
      exam_id: eId ? eId : room?.exam_id,
      teacher_id: tId ? tId : room?.teacher_id,
      name: name,
      description: desc,
      date_start: date ? date : formattedOldDate,
      time_start: time ? time : room?.time_start,
    };

    dispatch(updateRoom(roomId, data));
  };

  useEffect(() => {
    if (room) {
      const { id, room_name, description } = room;

      setName(room_name);
      setDesc(description);
      setRoomId(id);
    }
  }, [room]);

  // UPDATE PROCESS
  const { rUpdelLoad, rIsUpdated, rUpMsg, rUpError } = useSelector(
    (state) => state.r_updel
  );

  useEffect(() => {
    if (rIsUpdated) {
      toast.success(rUpMsg);

      dispatch({ type: UP_ROOM_RESET });

      dispatch(getRooms());

      close();
    } else {
      toast.error(rUpError);

      dispatch({ type: UP_ROOM_RESET });
    }
  }, [rIsUpdated, rUpMsg, rUpMsg]);

  return (
    <Modal
      open={open}
      onClose={close}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
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
          {eLoad || rDetailLoad || rUpdelLoad ? (
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
            <form
              onSubmit={updateHandler}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <TextField
                fullWidth
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                fullWidth
                value={desc || ""}
                onChange={(e) => setDesc(e.target.value)}
              />

              <FormControl fullWidth>
                <InputLabel>Exam</InputLabel>
                <Select
                  label="Exam"
                  value={selectedExam}
                  onChange={handleExamSelect}
                >
                  {exams?.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.exam_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Schedule"
                    onChange={handleDateTimeChange}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <Box sx={{ display: "flex", justifyContent: "end", gap: "10px" }}>
                <Button variant="contained" color="error" onClick={close}>
                  cancel
                </Button>

                <Button variant="contained" color="primary" type="submit">
                  update
                </Button>
              </Box>
            </form>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default R_Update;
