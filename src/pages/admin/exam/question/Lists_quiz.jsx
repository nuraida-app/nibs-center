import {
  Avatar,
  Backdrop,
  Box,
  Button,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import Loader from "../../../component/Loader/Loader";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { blue, green, grey, orange, red } from "@mui/material/colors";
import { useRef, useState } from "react";
import Q_add from "./Q_add";
import Q_upload from "./Q_upload";

const createMarkup = (html) => {
  return { __html: html };
};

const Lists_quiz = ({ data, load }) => {
  const mc = data?.questions.filter((item) => item.quiz_type === 1);
  const e = data?.questions.filter((item) => item.quiz_type === 2);

  const [openAdd, setOpenAdd] = useState(false);
  const [openUp, setOpenUp] = useState(false);

  const download = () => {
    window.open("/quiz_templete.xlsx", "_blank");
  };

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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "whitesmoke",
              borderRadius: "5px",
            }}
          >
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
                <IconButton onClick={() => setOpenAdd(true)}>
                  <AddCircleIcon sx={{ color: blue[800] }} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Upload">
                <IconButton onClick={() => setOpenUp(true)}>
                  <UploadFileIcon sx={{ color: green[800] }} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Templete">
                <IconButton onClick={download}>
                  <InsertDriveFileIcon sx={{ color: grey[700] }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Modal
            open={openAdd}
            onClose={() => setOpenAdd(false)}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{ backdrop: { timeout: 500 } }}
          >
            <div ref={useRef(null)}>
              <Q_add open={openAdd} close={() => setOpenAdd(false)} />
            </div>
          </Modal>

          <Modal
            open={openUp}
            onClose={() => setOpenUp(false)}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{ backdrop: { timeout: 500 } }}
          >
            <div ref={useRef(null)}>
              <Q_upload open={openUp} close={() => setOpenUp(false)} />
            </div>
          </Modal>

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
                <Box sx={{ display: "flex", gap: "10px", mb: 2 }}>
                  <Typography>{index + 1}.</Typography>
                  <Typography
                    dangerouslySetInnerHTML={createMarkup(item.quiz)}
                  />
                </Box>

                {item.audio ? (
                  <audio controls>
                    <source src={item.audio} type="audio/mp3" />
                  </audio>
                ) : null}

                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  {item.answer_1 ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ justifyContent: "flex-start" }}
                    >
                      <Avatar
                        sx={{
                          width: 30,
                          height: 30,
                          fontSize: 14,
                          mr: 2,
                          bgcolor: item.key === "A" ? "red" : null,
                        }}
                      >
                        A
                      </Avatar>
                      <Box
                        dangerouslySetInnerHTML={createMarkup(item.answer_1)}
                      />
                    </Button>
                  ) : null}

                  {item.answer_2 ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ justifyContent: "flex-start" }}
                    >
                      <Avatar
                        sx={{
                          width: 30,
                          height: 30,
                          fontSize: 14,
                          mr: 2,
                          bgcolor: item.key === "B" ? "red" : null,
                        }}
                      >
                        B
                      </Avatar>
                      <Box
                        dangerouslySetInnerHTML={createMarkup(item.answer_2)}
                      />
                    </Button>
                  ) : null}

                  {item.answer_3 ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ justifyContent: "flex-start" }}
                    >
                      <Avatar
                        sx={{
                          width: 30,
                          height: 30,
                          fontSize: 14,
                          mr: 2,
                          bgcolor: item.key === "C" ? "red" : null,
                        }}
                      >
                        C
                      </Avatar>
                      <Box
                        dangerouslySetInnerHTML={createMarkup(item.answer_3)}
                      />
                    </Button>
                  ) : null}

                  {item.answer_4 ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ justifyContent: "flex-start" }}
                    >
                      <Avatar
                        sx={{
                          width: 30,
                          height: 30,
                          fontSize: 14,
                          mr: 2,
                          bgcolor: item.key === "D" ? "red" : null,
                        }}
                      >
                        D
                      </Avatar>
                      <Box
                        dangerouslySetInnerHTML={createMarkup(item.answer_4)}
                      />
                    </Button>
                  ) : null}

                  {item.answer_5 ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ justifyContent: "flex-start" }}
                    >
                      <Avatar
                        sx={{
                          width: 30,
                          height: 30,
                          fontSize: 14,
                          mr: 2,
                          bgcolor: item.key === "E" ? "red" : null,
                        }}
                      >
                        E
                      </Avatar>
                      <Box
                        dangerouslySetInnerHTML={createMarkup(item.answer_5)}
                      />
                    </Button>
                  ) : null}
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
