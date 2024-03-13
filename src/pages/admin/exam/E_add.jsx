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
import { addExam, getExams, updateExam } from "../../../Redux/exam/E_action";
import { toast } from "react-toastify";
import {
  ADD_EXAM_RESET,
  DETAIL_EXAM_RESET,
  UP_EXAM_RESET,
} from "../../../Redux/exam/E_const";

const E_add = ({ open, close }) => {
  // GLOBAL STATE
  const dispatch = useDispatch(open);

  const { teachers, tLoad } = useSelector((state) => state.teachers);
  const { grades, gload } = useSelector((state) => state.grades);

  const { eLoad, eIsAdded, eSuccessMsg, eErrorMsg } = useSelector(
    (state) => state.e_add
  );

  const [teacher, setTeacher] = useState("");

  const [teacherId, setTeacherId] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [mcPoints, setMcPoints] = useState("");
  const [ePoints, setEPoints] = useState("");
  const [gradeId, setGradeId] = useState("");

  // CREATE

  useEffect(() => {
    if (teacher) {
      setTeacherId(teacher._id);
    }
  }, [teacher]);

  useEffect(() => {
    if (eIsAdded) {
      toast.success(eSuccessMsg);

      setTeacher("");
      setTeacherId("");
      setTitle("");
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

  // UPDATE
  const { detail, detail_Load, exams } = useSelector((state) => state.exams);
  const { updelLoad, eIsUpdated, eUpMsg, eUpError } = useSelector(
    (state) => state.e_updel
  );

  const [detailExam, setDetailExam] = useState(null);
  const [examId, setExamId] = useState("");

  useEffect(() => {
    const filtered = exams?.filter((item) => item._id === detail?._id);

    if (filtered.length > 0) {
      setDetailExam(filtered[0]);
    }
  }, [detail, exams]);

  useEffect(() => {
    if (detailExam) {
      const { _id, teacher_id, exam_name, time, pg, essay, grade_id } =
        detailExam;
      setExamId(_id);
      setTeacherId(teacher_id);
      setTitle(exam_name);
      setTime(time);
      setMcPoints(pg);
      setEPoints(essay);
      setGradeId(grade_id);
    }
  }, [detailExam]);

  useEffect(() => {
    if (eIsUpdated) {
      toast.success(eUpMsg);

      dispatch(getExams());

      dispatch({ type: UP_EXAM_RESET });

      close();
    } else {
      toast.error(eUpError);

      dispatch({ type: UP_EXAM_RESET });
    }
  }, [eIsUpdated, eUpMsg, eUpError]);

  // FUNCTION
  const createExam = (e) => {
    e.preventDefault();

    const data = {
      exam_name: title,
      teacher_id: teacherId,
      time: time,
      pg: mcPoints,
      essay: ePoints,
      grade_id: gradeId,
    };

    if (examId) {
      dispatch(updateExam(examId, data));
    } else {
      dispatch(addExam(data));
    }
  };

  const closeHandler = () => {
    close();

    dispatch({ type: DETAIL_EXAM_RESET });
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
          {tLoad || gload || eLoad || detail_Load || updelLoad ? (
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
                  value={gradeId || ""}
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
                placeholder="Title"
                value={title || ""}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <TextField
                type="number"
                placeholder="Multiple Choice"
                value={mcPoints || ""}
                onChange={(e) => setMcPoints(e.target.value)}
                required
              />

              <TextField
                type="number"
                placeholder="Essay"
                value={ePoints || ""}
                onChange={(e) => setEPoints(e.target.value)}
                required
              />

              <TextField
                type="number"
                placeholder="Duration"
                value={time || ""}
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
                <Button
                  variant="contained"
                  color="error"
                  onClick={closeHandler}
                >
                  cancel
                </Button>
                <Button variant="contained" color="success" type="submit">
                  {examId ? "update" : "add"}
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
