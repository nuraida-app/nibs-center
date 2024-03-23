import {
  Box,
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addQuiz } from "../../../../Redux/exam/Q_action";
import Loader from "../../../component/Loader/Loader";
import { ADD_QUIZ_RESET } from "../../../../Redux/exam/Q_const";

const Q_add = ({ open, close }) => {
  const dispatch = useDispatch();

  const { qAddLoad, qIsAdded, qSuccessMsg, qErrorMsg } = useSelector(
    (state) => state.q_add
  );

  const params = useParams();
  const editorRef = useRef(null);
  const inputRef = useRef(null);

  const [quiz, setQuiz] = useState("");
  const [type, setType] = useState("1");
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [key, setKey] = useState("");
  const [audio, setAudio] = useState("");

  const handleQuiz = (value) => setQuiz(value);

  const clickAudio = () => inputRef.current.click();

  const handleAudio = (e) => {
    const file = e.target.files[0];

    setAudio(file);
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const createQuiz = (e) => {
    e.preventDefault();

    if (!quiz) {
      toast.error("Please provide a question");

      return;
    }

    if (type === "1" && !key) {
      toast.error("Please provide a key");

      return;
    }

    const data = {
      exam_id: params.id,
      quiz_type: type,
      quiz: quiz,
      audio: audio ? audio : null,
      answer_1: answers[0] || null,
      answer_2: answers[1] || null,
      answer_3: answers[2] || null,
      answer_4: answers[3] || null,
      answer_5: answers[4] || null,
      key: key,
    };

    dispatch(addQuiz(data));
  };

  useEffect(() => {
    if (qIsAdded) {
      toast.success(qSuccessMsg);

      setQuiz("");
      setAnswers("");
      setType("");
      setKey("");

      close();

      dispatch({ type: ADD_QUIZ_RESET });
    } else {
      toast.error(qErrorMsg);

      dispatch({ type: ADD_QUIZ_RESET });
    }
  }, [qIsAdded, qSuccessMsg, qErrorMsg]);

  const renderEditors = () => {
    return answers.map((answer, index) => (
      <Box key={index} sx={{ boxShadow: 4 }}>
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_KEY}
          onInit={(evt, editor) => (editorRef.current = editor)}
          value={answer}
          init={{
            height: 300,
            placeholder: `Answer ${String.fromCharCode(65 + index)}`,
            menubar: true,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            images_upload_url: `${import.meta.env.VITE_BASE}/api/upload/images`,
          }}
          onEditorChange={(value) => handleAnswerChange(index, value)}
        />
      </Box>
    ));
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
            width: 1200,
            height: type === "1" ? 700 : 500,
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 2,
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "start",
            borderRadius: "5px",
            overflow: "auto",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
            <Typography variant="h6" align="center">
              Add Question
            </Typography>

            <FormControl sx={{ width: 300 }}>
              <InputLabel>Question Type</InputLabel>
              <Select
                label="Question Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="1">Multiple Choice</MenuItem>
                <MenuItem value="2">Essay</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {qAddLoad ? (
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
              onSubmit={createQuiz}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                position: "relative",
              }}
            >
              <Box sx={{ boxShadow: 4 }}>
                <Editor
                  apiKey={import.meta.env.VITE_TINYMCE_KEY}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  value={quiz || ""}
                  init={{
                    height: 300,
                    placeholder: "Add Question Here ...",
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    images_upload_url: `${
                      import.meta.env.VITE_BASE
                    }/api/upload/images`,
                  }}
                  onEditorChange={handleQuiz}
                />
              </Box>

              <Button
                variant="contained"
                color="secondary"
                onClick={clickAudio}
              >
                {audio ? audio.name : "Upload Audio"}
              </Button>

              <input
                ref={inputRef}
                onChange={handleAudio}
                type="file"
                multiple
                accept="audio/*"
                style={{ display: "none" }}
              />

              {type === "1" && renderEditors()}

              {type === "1" && (
                <FormControl fullWidth>
                  <InputLabel>Key</InputLabel>
                  <Select
                    label="Key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                  >
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                    <MenuItem value="D">D</MenuItem>
                    <MenuItem value="E">E</MenuItem>
                  </Select>
                </FormControl>
              )}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Button variant="contained" color="error" onClick={close}>
                  Cancel
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

export default Q_add;
