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
import {
  addTeacher,
  getTeachers,
  updateTeacher,
} from "../../../Redux/user/T_action";
import { toast } from "react-toastify";
import Loader from "../../component/Loader/Loader";
import {
  ADD_TEACHER_RESET,
  DETAIL_TEACHER_RESET,
  UP_TEACHER_RESET,
} from "../../../Redux/user/T_const";

const T_Add = ({ open, close }) => {
  const dispatch = useDispatch();

  const { subjects, sLoad } = useSelector((state) => state.subjects);
  const { tDetailLoad, teacher } = useSelector((state) => state.teacher);
  const { tAddLoad, tIsAdded, tAddSuccess, tAddError } = useSelector(
    (state) => state.t_add
  );
  const { tUp_Load, tIsUpdated, tUp_Success, tUp_error } = useSelector(
    (state) => state.t_updel
  );

  const [nip, setNip] = useState("");
  const [name, setName] = useState("");
  const [s_id, setId] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const addHandler = (e) => {
    e.preventDefault();

    const data = {
      nip: nip,
      name: name,
      subject_id: s_id,
      role: "teacher",
    };

    if (teacherId) {
      dispatch(updateTeacher(teacherId, data));
    } else {
      dispatch(addTeacher(data));
    }
  };

  useEffect(() => {
    if (tIsAdded) {
      toast.success(tAddSuccess);
      setNip("");
      setName("");
      setId("");

      close();

      dispatch(getTeachers());
    } else {
      toast.error(tAddError);

      dispatch({ type: ADD_TEACHER_RESET });
    }
  }, [tIsAdded, tAddSuccess, tAddError]);

  useEffect(() => {
    if (teacher) {
      setNip(teacher.nip);
      setName(teacher.name);
      setId(teacher.subject_id);
      setTeacherId(teacher._id);
    }
  }, [teacher]);

  const closeModal = () => {
    dispatch({ type: DETAIL_TEACHER_RESET });

    close();
  };

  useEffect(() => {
    if (tIsUpdated) {
      toast.success(tUp_Success);

      dispatch(getTeachers());

      dispatch({ type: UP_TEACHER_RESET });

      close();
    } else {
      toast.error(tUp_error);

      dispatch({ type: UP_TEACHER_RESET });
    }
  }, [tIsUpdated, tUp_Success, tUp_error]);

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
          {tAddLoad || sLoad || tDetailLoad || tUp_Load ? (
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
                <FormLabel>NIP</FormLabel>
                <TextField
                  required
                  type="text"
                  value={nip || ""}
                  placeholder="Enter nip"
                  onChange={(e) => setNip(e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel>Name</FormLabel>
                <TextField
                  required
                  type="text"
                  value={name || ""}
                  placeholder="Full name"
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <InputLabel>Subject</InputLabel>
                <Select
                  required
                  value={s_id || ""}
                  onChange={(e) => setId(e.target.value)}
                  label="Choose Subject"
                >
                  {subjects?.map((subject) => (
                    <MenuItem
                      key={subject.subject_id}
                      value={subject.subject_id}
                    >
                      {subject.subject}
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
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => closeModal()}
                >
                  cancel
                </Button>
                <Button variant="contained" color="success" type="submit">
                  {teacher ? "Update" : "Add"}
                </Button>
              </Box>
            </form>
          )}
        </Box>
      </Fade>
    </div>
  );
};

export default T_Add;
