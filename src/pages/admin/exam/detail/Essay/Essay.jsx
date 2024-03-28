import {
  Box,
  Button,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Loader from "../../../../component/Loader/Loader";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { giveScore } from "../../../../../Redux/answer/A_action";
import { toast } from "react-toastify";
import { give_score_reset } from "../../../../../Redux/answer/A_const";

const columns = [
  { id: "1", label: "No", minWidth: 20 },
  { id: "2", label: "NIS", minWidth: 100 },
  { id: "3", label: "Name", minWidth: 175 },
  { id: "5", label: "Class", minWidth: 30 },
];

const createMarkup = (html) => {
  return { __html: html };
};

const Essay = ({ eload, sLoad, students, exam, answers }) => {
  const dispatch = useDispatch();

  const { loading, success, message, error } = useSelector(
    (state) => state.essayScore
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [essayScores, setEssayScores] = useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filtering = (user) => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filtered = students?.filter(filtering);

  const serachFunction = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleScoreChange = (key, score, answerId) => {
    setEssayScores((prevScores) => ({
      ...prevScores,
      [key]: score,
      [`${key}-answer_score`]: score, // Simpan answer_score ke dalam state essayScores
    }));

    // Jika nilai answer_score ada, simpan juga ke dalam state essayScores
    setEssayScores((prevScores) => ({
      ...prevScores,
      [key]: score,
      [`${key}-answer_score`]: score, // Simpan answer_score ke dalam state essayScores
      [`${key}-answer_id`]: answerId, // Simpan answer_id ke dalam state essayScores
    }));
  };

  const saveScores = () => {
    for (const answerId in essayScores) {
      const score = essayScores[answerId];
      if (typeof score !== "undefined") {
        const [nis, essayId] = answerId.split("-");
        const answerIdToSave = essayScores[`${answerId}-answer_id`];

        console.log("NIS:", nis, "Total Score:", score, "Answer ID:", essayId);

        // Check if answerIdToSave is defined
        if (typeof answerIdToSave !== "undefined") {
          // Only dispatch giveScore action if the score and answerIdToSave are defined
          dispatch(giveScore(answerIdToSave, { score }));
        }
      }
    }
  };

  const calculateTotalScore = (student) => {
    let totalScore = 0;
    exam.questions.forEach((es) => {
      const answer = answers.find(
        (a) => a.nis.toString() === student.nis && a.quiz_id === es._id
      );
      const score = essayScores[`${student.nis}-${es._id}`];
      if (score && answer) {
        totalScore += parseInt(score);
      }
    });
    return totalScore;
  };

  const essay = exam?.questions.filter((item) => item.quiz_type === 2);

  useEffect(() => {
    if (success) {
      toast.success(message);

      dispatch({ type: give_score_reset });
    } else {
      toast.error(error);

      dispatch({ type: give_score_reset });
    }
  }, [error, success, message]);

  return (
    <Box
      sx={{
        mt: 2,
        borderRadius: "5px",
        minHeight: 355,
        bgcolor: "whitesmoke",
        p: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            borderRadius: "5px",
            bgcolor: "#E0E0E0",
            padding: "5px",
            width: "88%",
          }}
        >
          <SearchIcon />

          <Input
            sx={{ width: "98%" }}
            type="text"
            placeholder="Search By Name"
            onChange={serachFunction}
            value={searchTerm}
          />
        </Box>

        <Button
          variant="contained"
          color="info"
          startIcon={<CloudDownloadIcon />}
          sx={{ height: 40, mr: 4 }}
        >
          Export
        </Button>
      </Box>

      {eload || sLoad ? (
        <Loader />
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden", mt: 2 }}>
          <TableContainer sx={{ maxHeight: 625 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="center"
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  {essay.map((item, index) => (
                    <Fragment key={item._id}>
                      <TableCell align="center" style={{ maxWidth: 130 }}>
                        Essay {index + 1}
                      </TableCell>
                      <TableCell align="center" style={{ width: 90 }}>
                        Score {index + 1}
                      </TableCell>
                    </Fragment>
                  ))}

                  <TableCell align="center" style={{ width: 90 }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filtered.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filtered
                ).map((student, index) => (
                  <Fragment key={student._id}>
                    <TableRow hover>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{student.nis}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell align="center">{student.class}</TableCell>
                      {essay.map((es) => {
                        const answer = answers?.find(
                          (a) =>
                            a.nis.toString() === student.nis &&
                            a.quiz_id === es._id
                        );

                        return (
                          <Fragment key={`essay-${es._id}`}>
                            <TableCell align="center">
                              {answer ? (
                                <Typography
                                  dangerouslySetInnerHTML={createMarkup(
                                    answer.essay
                                  )}
                                  fontSize={14}
                                />
                              ) : (
                                "No answer"
                              )}
                            </TableCell>
                            <TableCell align="center">
                              <Input
                                type="number"
                                value={
                                  essayScores[`${student.nis}-${es._id}`] !==
                                  undefined
                                    ? essayScores[`${student.nis}-${es._id}`]
                                    : typeof answer?.answer_score !==
                                      "undefined"
                                    ? answer.answer_score // Jika answer_score sudah ada, gunakan nilainya
                                    : "" // Atau biarkan kosong jika tidak ada nilai sebelumnya
                                }
                                onChange={(e) =>
                                  handleScoreChange(
                                    `${student.nis}-${es._id}`,
                                    e.target.value,
                                    answer?._id
                                  )
                                }
                              />
                            </TableCell>
                          </Fragment>
                        );
                      })}

                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={saveScores}
                        >
                          {loading ? "..." : "save"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100, 200]}
            component="div"
            count={filtered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Box>
  );
};

export default Essay;
