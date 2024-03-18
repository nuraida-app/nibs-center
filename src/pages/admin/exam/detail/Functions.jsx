import { Box, Button } from "@mui/material";
import ScoreIcon from "@mui/icons-material/Score";
import EditIcon from "@mui/icons-material/Edit";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Loader from "../../../component/Loader/Loader";
import GroupsIcon from "@mui/icons-material/Groups";

const Functions = ({ exam, load, component, students }) => {
  const handleComponent = (e) => component(e);

  return (
    <Box
      sx={{
        bgcolor: "whitesmoke",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        borderRadius: "5px",
        mt: 2,
        p: 1,
        gap: 2,
      }}
    >
      {load ? (
        <Loader />
      ) : (
        <>
          <Button
            variant="contained"
            color="success"
            startIcon={<GroupsIcon />}
            onClick={() => handleComponent("students")}
          >
            Students ({students?.length})
          </Button>

          <Button
            variant="contained"
            color="success"
            startIcon={<TroubleshootIcon />}
            onClick={() => handleComponent("analysis")}
          >
            Analysis
          </Button>

          <Button
            variant="contained"
            color="success"
            startIcon={<EditIcon />}
            onClick={() => handleComponent("essay")}
          >
            Essay
          </Button>

          <Button
            variant="contained"
            color="success"
            startIcon={<ScoreIcon />}
            onClick={() => handleComponent("scores")}
          >
            Scores
          </Button>

          <Button
            variant="contained"
            color="success"
            startIcon={<AccessTimeIcon />}
          >
            {exam?.time} Minutes
          </Button>
        </>
      )}
    </Box>
  );
};

export default Functions;
