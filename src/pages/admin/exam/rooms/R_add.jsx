import {
  Box,
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../component/Loader/Loader";
import { addRoom, getRooms } from "../../../../Redux/exam/E_action";
import { ADD__ROOM_RESET } from "../../../../Redux/exam/E_const";
import { toast } from "react-toastify";

const R_add = ({ open, close }) => {
  const dispatch = useDispatch();

  const { exams, eLoad } = useSelector((state) => state.exams);
  const { rAddLoad, rIsAdded, rSuccessMsg, rErrorMsg } = useSelector(
    (state) => state.r_add
  );

  const [isScheduled, setSchedule] = useState("1");

  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tId, setT] = useState("");
  const [eId, setE] = useState("");
  const [selectedExam, setSelectedExam] = useState(""); // state untuk menyimpan ujian yang dipilih

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

  const createRoom = (e) => {
    e.preventDefault();

    const data = {
      exam_id: eId,
      teacher_id: tId,
      name: name,
      description: description,
      date_start: date,
      time_start: time,
    };

    dispatch(addRoom(data));
  };

  useEffect(() => {
    if (rIsAdded) {
      toast.success(rSuccessMsg);

      setDate("");
      setTime("");
      setDescription("");
      setName("");
      setSelectedExam("");
      setT("");
      setE("");

      dispatch(getRooms());

      dispatch({ type: ADD__ROOM_RESET });

      close();
    } else {
      toast.error(rErrorMsg);

      dispatch({ type: ADD__ROOM_RESET });
    }
  }, [rIsAdded, rSuccessMsg, rErrorMsg]);

  return (
    <div>
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
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            borderRadius: "5px",
          }}
        >
          {eLoad || rAddLoad ? (
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
              onSubmit={createRoom}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <TextField
                fullWidth
                required
                placeholder="Room's Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                fullWidth
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

              <FormControl fullWidth>
                <InputLabel>Schedule</InputLabel>
                <Select
                  label="Schedule"
                  value={isScheduled}
                  onChange={(e) => setSchedule(e.target.value)}
                >
                  <MenuItem value="2">Yes</MenuItem>
                  <MenuItem value="1">No</MenuItem>
                </Select>
              </FormControl>

              {isScheduled === "2" && (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label="Schedule"
                      onChange={handleDateTimeChange}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              )}

              <Box sx={{ display: "flex", justifyContent: "end", gap: "10px" }}>
                <Button variant="contained" color="error" onClick={close}>
                  cancel
                </Button>

                <Button variant="contained" color="primary" type="submit">
                  Add
                </Button>
              </Box>
            </form>
          )}
        </Box>
      </Fade>
    </div>
  );
};

export default R_add;
