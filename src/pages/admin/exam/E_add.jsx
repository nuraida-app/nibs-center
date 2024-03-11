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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader/Loader";
import { addExam, getExams } from "../../../Redux/exam/E_action";
import { toast } from "react-toastify";
import { ADD_EXAM_RESET } from "../../../Redux/exam/E_const";

const E_add = ({ open, close }) => {
  const dispatch = useDispatch(open);

  const { teachers, tLoad } = useSelector((state) => state.teachers);
  const { grades, gload } = useSelector((state) => state.grades);

  const { eLoad, eIsAdded, eSuccessMsg, eErrorMsg } = useSelector(
    (state) => state.e_add
  );

  const [teacher, setTeacher] = useState("");

  const [teacherId, setTeacherId] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [time, setTime] = useState("");
  const [mcPoints, setMcPoints] = useState("");
  const [ePoints, setEPoints] = useState("");
  const [gradeId, setGradeId] = useState("");

  useEffect(() => {
    if (teacher) {
      setTeacherId(teacher._id);
      setSubject(teacher.subject);
      setSubjectId(teacher.subject_id);
    }
  }, [teacher]);

  const createExam = (e) => {
    e.preventDefault();

    const data = {
      exam_name: title,
      subject_id: subjectId,
      teacher_id: teacherId,
      time: time,
      pg: mcPoints,
      essay: ePoints,
      grade_id: gradeId,
    };

    dispatch(addExam(data));

    console.log(data);
  };

  useEffect(() => {
    if (eIsAdded) {
      toast.success(eSuccessMsg);

      setTeacher("");
      setTeacherId("");
      setTitle("");
      setSubject("");
      setSubjectId("");
      setTime("");
      setMcPoints("");
      setEPoints("");
      setGradeId("");

      dispatch(getExams());

      dispatch({ type: ADD_EXAM_RESET });

      close();
    } else {
      toast.error(eErrorMsg);

      dispatch({ type: ADD_EXAM_RESET });
    }
  }, [eIsAdded, eErrorMsg, eSuccessMsg]);

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
          {tLoad || gload || eLoad ? (
            <Loader />
          ) : (
            <form
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
              onSubmit={createExam}
            >
              <FormControl fullWidth>
                <InputLabel>Select Teacher</InputLabel>
                <Select
                  label="Select Teacher"
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                  required
                >
                  {teachers?.map((teacher) => (
                    <MenuItem key={teacher._id} value={teacher}>
                      {teacher.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Select Grade</InputLabel>
                <Select
                  label="Select Grade"
                  value={gradeId}
                  onChange={(e) => setGradeId(e.target.value)}
                  required
                >
                  {grades?.map((item) => (
                    <MenuItem key={item.grade_id} value={item.grade_id}>
                      {item.grade}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                required
                placeholder="Subject"
                value={subject}
                aria-readonly
              />

              <TextField
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <TextField
                type="number"
                placeholder="Multiple Choice"
                value={mcPoints}
                onChange={(e) => setMcPoints(e.target.value)}
                required
              />

              <TextField
                type="number"
                placeholder="Essay"
                value={ePoints}
                onChange={(e) => setEPoints(e.target.value)}
                required
              />

              <TextField
                type="number"
                placeholder="Duration"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <Button variant="contained" color="error" onClick={close}>
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

export default E_add;
