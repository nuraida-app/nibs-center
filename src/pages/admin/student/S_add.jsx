import {
  Box,
  Button,
  Fade,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../component/Loader/Loader";
import {
  addStudent,
  getStudents,
  updateStudent,
} from "../../../Redux/user/S_action";
import {
  ADD_STUDENT_RESET,
  DETAIL_STUDENT_RESET,
  UP_STUDENT_RESET,
} from "../../../Redux/user/S_const";

const S_add = ({ open, close }) => {
  const dispatch = useDispatch();

  const { grades, gLoad } = useSelector((state) => state.grades);
  const { classes, cLoad } = useSelector((state) => state.classes);

  const [nis, setNis] = useState("");
  const [name, setName] = useState("");
  const [g_id, setGid] = useState("");
  const [c_id, setCid] = useState("");
  const [s_id, setSid] = useState("");

  // ADD
  const { sAddLoad, sIsAdded, sAddSuccess, sAddError } = useSelector(
    (state) => state.st_add
  );

  const addHandler = (e) => {
    e.preventDefault();

    const data = {
      nis: nis,
      name: name,
      grade_id: g_id,
      class_id: c_id,
      role: "student",
    };

    if (s_id) {
      dispatch(updateStudent(s_id, data));
    } else {
      dispatch(addStudent(data));
    }
  };

  // ADD
  useEffect(() => {
    if (sIsAdded) {
      toast.success(sAddSuccess);
      setNis("");
      setName("");
      setGid("");
      setCid("");

      close();

      dispatch(getStudents());

      dispatch({ type: ADD_STUDENT_RESET });
    } else {
      toast.error(sAddError);

      dispatch({ type: ADD_STUDENT_RESET });
    }
  }, [sIsAdded, sAddSuccess, sAddError]);

  // UPDATE
  const { sUpDelLoad, sIsUpdated, sUpMsg, sUpError } = useSelector(
    (state) => state.st_updel
  );
  const { sDetailLoad, student, sDetailError } = useSelector(
    (state) => state.student
  );

  useEffect(() => {
    if (student) {
      setName(student.name);
      setNis(student.nis);
      setSid(student._id);
      setCid(student.class_id);
      setGid(student.grade_id);
    }
  }, [student]);

  useEffect(() => {
    if (sIsUpdated) {
      toast.success(sUpMsg);

      dispatch(getStudents());

      dispatch({ type: UP_STUDENT_RESET });

      close();
    } else {
      toast.error(sUpError);

      dispatch({ type: UP_STUDENT_RESET });
    }
  }, [sIsUpdated, sUpMsg, sUpError]);

  const cancel = () => {
    close();

    dispatch({ type: DETAIL_STUDENT_RESET });
  };

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
          {sAddLoad || cLoad || gLoad || sDetailLoad || sUpDelLoad ? (
            <Loader />
          ) : (
            <form
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
              onSubmit={addHandler}
            >
              <FormControl fullWidth>
                <FormLabel>NIS</FormLabel>
                <TextField
                  required
                  type="text"
                  value={nis}
                  placeholder="Enter NIS"
                  onChange={(e) => setNis(e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel>Name</FormLabel>
                <TextField
                  required
                  type="text"
                  value={name}
                  placeholder="Full Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <InputLabel>Grade</InputLabel>
                <Select
                  required
                  value={g_id}
                  onChange={(e) => setGid(e.target.value)}
                  label="Choose Grade"
                >
                  {grades?.map((grade) => (
                    <MenuItem key={grade.grade_id} value={grade.grade_id}>
                      {grade.grade}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel>class</InputLabel>
                <Select
                  required
                  value={c_id}
                  onChange={(e) => setCid(e.target.value)}
                  label="Choose Class"
                >
                  {classes?.map((item) => (
                    <MenuItem key={item.class_id} value={item.class_id}>
                      {item.class}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <Button variant="contained" color="error" onClick={cancel}>
                  cancel
                </Button>
                <Button variant="contained" color="success" type="submit">
                  add
                </Button>
              </Box>
            </form>
          )}
        </Box>
      </Fade>
    </div>
  );
};

export default S_add;
