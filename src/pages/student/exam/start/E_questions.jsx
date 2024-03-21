import {
  Avatar,
  Box,
  Button,
  Pagination,
  TextareaAutosize,
} from "@mui/material";
import { Fragment, useState, useEffect } from "react";
import { ProgressBar } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createAnswer, getMyAnswer } from "../../../../Redux/answer/A_action";
import { toast } from "react-toastify";
import { CREATE_ANSWER_RESET } from "../../../../Redux/answer/A_const";

const createMarkup = (html) => {
  return { __html: html };
};

const E_questions = ({ quiz, load }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const id = params.id;

  const { createLoading, isCreated, createMsg, error } = useSelector(
    (state) => state.a_add
  );

  const { myAnsLoading: loading, answers } = useSelector(
    (state) => state.myAnswers
  );

  // Answer
  const { user } = useSelector((state) => state.auth);

  const [quizId, setQuizId] = useState("");
  const [answer, setAnswer] = useState("");
  const [nis, setNis] = useState("");
  const [essay, setEssay] = useState("");

  const handleAnswer = (questionId, answer, nis) => {
    setQuizId(questionId);
    setAnswer(answer);
    setNis(nis);
  };

  useEffect(() => {
    if (nis) {
      const data = {
        exam_id: id,
        quiz_id: quizId,
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

  return (
    <Fragment>
      <Box
        sx={{
          p: 5,
          height: "calc(100vh - 64px)",
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
          <Box sx={{ height: 20 }}></Box>
        )}

        {currentQuestions.map((question, index) => (
          <Fragment key={question._id}>
            <Box
              sx={{
                p: 2,
                minHeight: 250,
                borderRadius: 2,
                bgcolor: "whitesmoke",
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
                        handleAnswer(question._id, e.target.value, user?.nis)
                      }
                    >
                      <Avatar
                        sx={{
                          mr: 2,
                          width: 30,
                          height: 30,
                          fontSize: 12,
                          bgcolor: answers.find(
                            (answer) =>
                              answer.quiz_id === question._id &&
                              answer.mc === "A"
                          )
                            ? "red"
                            : null,
                        }}
                      >
                        A
                      </Avatar>
                      {question.answer_1}
                    </Button>
                  ) : null}

                  {question.answer_2 ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      value="B"
                      style={{ justifyContent: "flex-start" }}
                      onClick={(e) =>
                        handleAnswer(question._id, e.target.value, user?.nis)
                      }
                    >
                      <Avatar
                        sx={{
                          mr: 2,
                          width: 30,
                          height: 30,
                          fontSize: 12,
                          bgcolor: answers.find(
                            (answer) =>
                              answer.quiz_id === question._id &&
                              answer.mc === "B"
                          )
                            ? "red"
                            : null,
                        }}
                      >
                        B
                      </Avatar>
                      {question.answer_2}
                    </Button>
                  ) : null}

                  {question.answer_3 ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      value="C"
                      style={{ justifyContent: "flex-start" }}
                      onClick={(e) =>
                        handleAnswer(question._id, e.target.value, user?.nis)
                      }
                    >
                      <Avatar
                        sx={{
                          mr: 2,
                          width: 30,
                          height: 30,
                          fontSize: 12,
                          bgcolor: answers.find(
                            (answer) =>
                              answer.quiz_id === question._id &&
                              answer.mc === "C"
                          )
                            ? "red"
                            : null,
                        }}
                      >
                        C
                      </Avatar>
                      {question.answer_3}
                    </Button>
                  ) : null}

                  {question.answer_4 ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      value="D"
                      style={{ justifyContent: "flex-start" }}
                      onClick={(e) =>
                        handleAnswer(question._id, e.target.value, user?.nis)
                      }
                    >
                      <Avatar
                        sx={{
                          mr: 2,
                          width: 30,
                          height: 30,
                          fontSize: 12,
                          bgcolor: answers.find(
                            (answer) =>
                              answer.quiz_id === question._id &&
                              answer.mc === "D"
                          )
                            ? "red"
                            : null,
                        }}
                      >
                        D
                      </Avatar>
                      {question.answer_4}
                    </Button>
                  ) : null}

                  {question.answer_5 ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      value="E"
                      style={{ justifyContent: "flex-start" }}
                      onClick={(e) =>
                        handleAnswer(question._id, e.target.value, user?.nis)
                      }
                    >
                      <Avatar
                        sx={{
                          mr: 2,
                          width: 30,
                          height: 30,
                          fontSize: 12,
                          bgcolor: answers.find(
                            (answer) =>
                              answer.quiz_id === question._id &&
                              answer.mc === "E"
                          )
                            ? "red"
                            : null,
                        }}
                      >
                        E
                      </Avatar>
                      {question.answer_5}
                    </Button>
                  ) : null}
                </Box>
              ) : (
                <TextareaAutosize
                  aria-label="textarea"
                  minRows={3}
                  placeholder="Your Answer"
                />
              )}
            </Box>
          </Fragment>
        ))}
        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={Math.ceil(combinedQuizzes.length / questionsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
            sx={{ bgcolor: "white", p: 1, borderRadius: 2 }}
          />
        </Box>
      </Box>
    </Fragment>
  );
};

export default E_questions;
