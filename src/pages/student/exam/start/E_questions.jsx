import {
  Avatar,
  Box,
  Button,
  Pagination,
  TextareaAutosize,
} from "@mui/material";
import { Fragment, useState, useEffect } from "react";
import CircleIcon from "@mui/icons-material/Circle";

const createMarkup = (html) => {
  return { __html: html };
};

const E_questions = ({ quiz, load }) => {
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

  // Logic for displaying current questions
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = combinedQuizzes.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  // Change page
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleAnswerClick = (questionId, answer) => {
    console.log("Question ID:", questionId);
    console.log("Selected Answer:", answer);
    // You can add your logic here to handle the selected answer
  };

  return (
    <Fragment>
      <Box
        sx={{
          p: 5,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          bgcolor: "#acacac",
        }}
      >
        {currentQuestions.map((question, index) => (
          <Fragment key={question._id}>
            <Box
              sx={{
                p: 2,
                minHeight: 150,
                borderRadius: 2,
                bgcolor: "whitesmoke",
              }}
              dangerouslySetInnerHTML={createMarkup(question.quiz)}
            />

            <Box sx={{ p: 2, borderRadius: 2, bgcolor: "whitesmoke" }}>
              {question.quiz_type === 1 ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {[1, 2, 3, 4, 5].map((index) => {
                    const answerKey = `answer_${index}`;
                    if (question[answerKey]) {
                      return (
                        <Button
                          key={answerKey}
                          variant="outlined"
                          color="primary"
                          style={{ justifyContent: "flex-start" }}
                          onClick={() =>
                            handleAnswerClick(question._id, question[answerKey])
                          }
                        >
                          <Avatar
                            sx={{ mr: 2, width: 30, height: 30, fontSize: 12 }}
                          >
                            {String.fromCharCode(64 + index)}
                          </Avatar>
                          {question[answerKey]}
                        </Button>
                      );
                    }
                    return null;
                  })}
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
