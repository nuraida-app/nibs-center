import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Pagination,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { Fragment, useState, useEffect, useRef, useMemo } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ProgressBar } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createAnswer, getMyAnswer } from "../../../../Redux/answer/A_action";
import { toast } from "react-toastify";
import { CREATE_ANSWER_RESET } from "../../../../Redux/answer/A_const";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";

const createMarkup = (html) => {
  return { __html: html };
};

const E_questions = ({ quiz, load }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const editorRef = useRef(null);

  const id = params.id;

  const { createLoading, isCreated, createMsg, error } = useSelector(
    (state) => state.a_add
  );

  const { myAnsLoading: loading, answers } = useSelector(
    (state) => state.myAnswers
  );

  // Number Selection
  const [open, setOpen] = useState(false);

  // Answer
  const { user } = useSelector((state) => state.auth);

  const [quizId, setQuizId] = useState("");
  const [qType, setQtype] = useState("");
  const [answer, setAnswer] = useState("");
  const [nis, setNis] = useState("");
  const [essays, setEssays] = useState({});

  const essayAnswers = useMemo(
    () => answers?.filter((item) => item.quiz_type === 2),
    [answers]
  );

  const handleEssay = (value, questionId, type) => {
    // Mengubah state essay sesuai dengan questionId
    setEssays((prevState) => ({
      ...prevState,
      [questionId]: { ...prevState[questionId], answer: value },
    }));
    // Mengatur quizId dan qType
    setQuizId(questionId);
    setQtype(type);
  };

  const submitEssay = () => {
    // Mengambil jawaban esai berdasarkan quizId
    const essay = essays[quizId]?.answer || "";
    const data = {
      exam_id: id,
      quiz_id: quizId,
      quiz_type: qType,
      essay: essay,
    };

    dispatch(createAnswer(data));
  };

  const handleAnswer = (questionId, answer, nis, type) => {
    setQuizId(questionId);
    setAnswer(answer);
    setQtype(type);
    setNis(nis);
  };

  useEffect(() => {
    if (essayAnswers) {
      const updatedEssays = {};
      essayAnswers.forEach((item) => {
        if (!updatedEssays[item.quiz_id]) {
          updatedEssays[item.quiz_id] = {
            quiz_id: item.quiz_id,
            answer: item.essay,
          };
        }
      });
      setEssays(updatedEssays);
    }
  }, [essayAnswers]);

  useEffect(() => {
    if (nis) {
      const data = {
        exam_id: id,
        quiz_id: quizId,
        quiz_type: qType,
        mc: answer,
      };

      dispatch(createAnswer(data));
    }
  }, [nis]);

  useEffect(() => {
    if (isCreated) {
      toast.success(createMsg);

      dispatch({ type: CREATE_ANSWER_RESET });

      dispatch(getMyAnswer(id, user?.nis));

      setQuizId("");
      setAnswer("");
      setEssays("");
      setNis("");
    } else {
      toast.error(error);

      dispatch({ type: CREATE_ANSWER_RESET });
    }
  }, [isCreated, createMsg, error, id, user]);

  useEffect(() => {
    dispatch(getMyAnswer(id, user?.nis));
  }, [id, user]);

  // Shuffle Question
  const [shuffledQuiz, setShuffledQuiz] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(1);

  useEffect(() => {
    // Shuffle the quiz array if it's not null and is an array
    if (Array.isArray(quiz) && quiz.length > 0) {
      const shuffledArray = [...quiz].sort(() => Math.random() - 0.5);
      setShuffledQuiz(shuffledArray);
    }
  }, [quiz]);

  // Return null if quiz is not an array
  if (!Array.isArray(quiz) || quiz.length === 0) {
    return null;
  }

  // Filter quizzes by type
  const type1Quizzes = shuffledQuiz.filter((q) => q.quiz_type === 1);
  const type2Quizzes = shuffledQuiz.filter((q) => q.quiz_type === 2);

  // Combine quizzes with type 1 first
  const combinedQuizzes = [...type1Quizzes, ...type2Quizzes];

  // Pagination
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = combinedQuizzes.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handlePageModal = (number) => {
    setCurrentPage(number);
    setOpen(false);
  };

  return (
    <Box
      sx={{
        p: 5,
        position: "relative",
        top: 50,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        bgcolor: "#acacac",
      }}
    >
      {createLoading || loading ? (
        <Box
          sx={{
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <ProgressBar
            visible={true}
            height="40"
            width="100"
            barColor="#90528c"
            borderColor="white"
            ariaLabel="progress-bar-loading"
          />
        </Box>
      ) : (
        <Box sx={{ height: 20, position: "relative" }}>
          <Button
            sx={{ position: "absolute", left: 0, bottom: 0 }}
            variant="contained"
            color="info"
            onClick={() => setOpen(true)}
          >
            No {currentPage}
          </Button>

          <Modal
            open={open}
            onClose={() => setOpen(false)}
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
                  bgcolor: "white",
                  p: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  flexWrap: "wrap",
                  gap: 3,
                }}
              >
                {combinedQuizzes?.map((item, index) => (
                  <Button
                    variant={
                      answers?.find((a) => a.quiz_id === item._id)
                        ? "contained"
                        : "outlined"
                    }
                    color="error"
                    key={index}
                    onClick={() => handlePageModal(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </Box>
            </Fade>
          </Modal>
        </Box>
      )}

      {currentQuestions.map((question, index) => (
        <Fragment key={question._id}>
          <Box
            sx={{
              p: 2,
              minHeight: 350,
              borderRadius: 2,
              bgcolor: "whitesmoke",
              overflow: "auto",
            }}
            dangerouslySetInnerHTML={createMarkup(question.quiz)}
          />

          <Box sx={{ p: 2, borderRadius: 2, bgcolor: "whitesmoke" }}>
            {question.quiz_type === 1 ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {question.answer_1 ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ justifyContent: "flex-start" }}
                    value="A"
                    onClick={(e) =>
                      handleAnswer(
                        question._id,
                        e.target.value,
                        user?.nis,
                        question.quiz_type
                      )
                    }
                  >
                    <Avatar
                      sx={{
                        mr: 2,
                        width: 30,
                        height: 30,
                        fontSize: 12,
                        bgcolor: answers?.find(
                          (answer) =>
                            answer.quiz_id === question._id && answer.mc === "A"
                        )
                          ? "red"
                          : null,
                      }}
                    >
                      A
                    </Avatar>
                    <Typography
                      dangerouslySetInnerHTML={createMarkup(question.answer_1)}
                    />
                  </Button>
                ) : null}

                {question.answer_2 ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    value="B"
                    style={{ justifyContent: "flex-start" }}
                    onClick={(e) =>
                      handleAnswer(
                        question._id,
                        e.target.value,
                        user?.nis,
                        question.quiz_type
                      )
                    }
                  >
                    <Avatar
                      sx={{
                        mr: 2,
                        width: 30,
                        height: 30,
                        fontSize: 12,
                        bgcolor: answers?.find(
                          (answer) =>
                            answer.quiz_id === question._id && answer.mc === "B"
                        )
                          ? "red"
                          : null,
                      }}
                    >
                      B
                    </Avatar>
                    <Typography
                      dangerouslySetInnerHTML={createMarkup(question.answer_2)}
                    />
                  </Button>
                ) : null}

                {question.answer_3 ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    value="C"
                    style={{ justifyContent: "flex-start" }}
                    onClick={(e) =>
                      handleAnswer(
                        question._id,
                        e.target.value,
                        user?.nis,
                        question.quiz_type
                      )
                    }
                  >
                    <Avatar
                      sx={{
                        mr: 2,
                        width: 30,
                        height: 30,
                        fontSize: 12,
                        bgcolor: answers?.find(
                          (answer) =>
                            answer.quiz_id === question._id && answer.mc === "C"
                        )
                          ? "red"
                          : null,
                      }}
                    >
                      C
                    </Avatar>
                    <Typography
                      dangerouslySetInnerHTML={createMarkup(question.answer_3)}
                    />
                  </Button>
                ) : null}

                {question.answer_4 ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    value="D"
                    style={{ justifyContent: "flex-start" }}
                    onClick={(e) =>
                      handleAnswer(
                        question._id,
                        e.target.value,
                        user?.nis,
                        question.quiz_type
                      )
                    }
                  >
                    <Avatar
                      sx={{
                        mr: 2,
                        width: 30,
                        height: 30,
                        fontSize: 12,
                        bgcolor: answers?.find(
                          (answer) =>
                            answer.quiz_id === question._id && answer.mc === "D"
                        )
                          ? "red"
                          : null,
                      }}
                    >
                      D
                    </Avatar>
                    <Typography
                      dangerouslySetInnerHTML={createMarkup(question.answer_4)}
                    />
                  </Button>
                ) : null}

                {question.answer_5 ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    value="E"
                    style={{ justifyContent: "flex-start" }}
                    onClick={(e) =>
                      handleAnswer(
                        question._id,
                        e.target.value,
                        user?.nis,
                        question.quiz_type
                      )
                    }
                  >
                    <Avatar
                      sx={{
                        mr: 2,
                        width: 30,
                        height: 30,
                        fontSize: 12,
                        bgcolor: answers?.find(
                          (answer) =>
                            answer.quiz_id === question._id && answer.mc === "E"
                        )
                          ? "red"
                          : null,
                      }}
                    >
                      E
                    </Avatar>
                    <Typography
                      dangerouslySetInnerHTML={createMarkup(question.answer_5)}
                    />
                  </Button>
                ) : null}
              </Box>
            ) : (
              <Box sx={{ position: "relative" }}>
                <Editor
                  apiKey={import.meta.env.VITE_TINYMCE_KEY}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  value={
                    // Menampilkan jawaban esai jika sudah ada
                    (typeof essays === "object" &&
                      question._id in essays &&
                      essays[question._id]?.answer) ||
                    ""
                  }
                  init={{
                    height: 300,
                    width: "95%",
                    placeholder: "type your answer here ...",
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
                  }}
                  onEditorChange={(content, editor) =>
                    handleEssay(content, question._id, question.quiz_type)
                  }
                />

                <Button
                  variant="contained"
                  color="warning"
                  sx={{ position: "absolute", right: 0, bottom: 0 }}
                  onClick={() => submitEssay()}
                >
                  save
                </Button>
              </Box>
            )}
          </Box>
        </Fragment>
      ))}
      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Pagination
          count={Math.ceil(combinedQuizzes.length / questionsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
          sx={{ bgcolor: "white", p: 1, borderRadius: 2 }}
        />

        <Button
          variant="contained"
          color="error"
          startIcon={<AssistantPhotoIcon />}
          sx={{ position: "absolute", right: 0 }}
        >
          Finis
        </Button>
      </Box>
    </Box>
  );
};

export default E_questions;
