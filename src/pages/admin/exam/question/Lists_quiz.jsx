import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import Loader from "../../../component/Loader/Loader";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { blue, green, grey, orange, red } from "@mui/material/colors";

const createMarkup = (html) => {
  return { __html: html };
};

const Lists_quiz = ({ data, load }) => {
  const mc = data?.questions.filter((item) => item.quiz_type === 1);
  const e = data?.questions.filter((item) => item.quiz_type === 2);
  return (
    <Box
      sx={{
        minHeight: 790,
        bgcolor: "#fff",
        borderRadius: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {load ? (
        <Loader />
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Button variant="contained" color="error">
                {data?.exam_name}
              </Button>

              <Button variant="contained" color="info">
                {data?.time} Minutes
              </Button>

              <Button variant="contained" color="warning">
                {`MC : ${data?.pg}%`}
              </Button>
              <Button variant="contained" color="warning">
                {`Essay : ${data?.essay}%`}
              </Button>
            </Box>

            <Box sx={{ display: "flex", gap: "10px" }}>
              <Tooltip title="Add">
                <IconButton>
                  <AddCircleIcon sx={{ color: blue[800] }} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Upload">
                <IconButton>
                  <UploadFileIcon sx={{ color: green[800] }} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Templete">
                <IconButton>
                  <InsertDriveFileIcon sx={{ color: grey[700] }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Typography variant="h6" align="center">
            Multiple Choices {`(${mc?.length})`}
          </Typography>
          {mc?.map((item, index) => (
            <Box
              key={item._id}
              sx={{
                display: "flex",
                p: 1,
                gap: "10px",
                boxShadow: 4,
                borderRadius: "10px",
              }}
            >
              <Box sx={{ width: "90%" }}>
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <Typography>{index + 1}.</Typography>
                  <Typography
                    dangerouslySetInnerHTML={createMarkup(item.quiz)}
                  />
                </Box>

                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <Box
                    sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        border: "1px solid red",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: item.key === "A" ? "red" : null,
                        color: item.key === "A" ? "white" : "black",
                      }}
                    >
                      A
                    </Box>
                    <Box
                      dangerouslySetInnerHTML={createMarkup(item.answer_1)}
                    />
                  </Box>
                  <Box
                    sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        border: "1px solid red",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: item.key === "B" ? "red" : null,
                        color: item.key === "B" ? "white" : "black",
                      }}
                    >
                      B
                    </Box>
                    <Box
                      dangerouslySetInnerHTML={createMarkup(item.answer_2)}
                    />
                  </Box>
                  <Box
                    sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        border: "1px solid red",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: item.key === "C" ? "red" : null,
                        color: item.key === "C" ? "white" : "black",
                      }}
                    >
                      C
                    </Box>
                    <Box
                      dangerouslySetInnerHTML={createMarkup(item.answer_3)}
                    />
                  </Box>
                  <Box
                    sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        border: "1px solid red",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: item.key === "D" ? "red" : null,
                        color: item.key === "D" ? "white" : "black",
                      }}
                    >
                      D
                    </Box>
                    <Box
                      dangerouslySetInnerHTML={createMarkup(item.answer_4)}
                    />
                  </Box>
                  <Box
                    sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        border: "1px solid red",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: item.key === "E" ? "red" : null,
                        color: item.key === "E" ? "white" : "black",
                      }}
                    >
                      E
                    </Box>
                    <Box
                      dangerouslySetInnerHTML={createMarkup(item.answer_5)}
                    />
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "10%",
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <IconButton>
                  <EditNoteIcon sx={{ color: orange[600] }} />
                </IconButton>

                <IconButton>
                  <PlaylistRemoveIcon sx={{ color: red[800] }} />
                </IconButton>
              </Box>
            </Box>
          ))}

          <Typography variant="h6" align="center">
            Essay {`(${e?.length})`}
          </Typography>
          {e?.map((item, index) => (
            <Box
              key={item._id}
              sx={{
                p: 2,
                boxShadow: 4,
                borderRadius: "5px",
                display: "flex",
                gap: "10px",
              }}
            >
              <Typography>{index + 1}.</Typography>
              <Typography dangerouslySetInnerHTML={createMarkup(item.quiz)} />
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default Lists_quiz;