import { Box, Button, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";

const F_Data = () => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {/* CLASSROOM */}
      <Button
        variant="contained"
        color="success"
        sx={{
          width: 250,
          height: 130,
          borderRadius: "10px",

          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <HomeIcon
          sx={{
            fontSize: 80,
            color: "white",
            "&:hover": { transform: "scale(1.2)" },
            transition: "transform 0.5s ease-in-out",
          }}
        />
        <Typography
          variant="h6"
          fontWeight={700}
          color="#fff"
          letterSpacing={1}
        >
          Classroom
        </Typography>
      </Button>

      {/* MANAGEMENT */}
      <Button
        variant="contained"
        color="warning"
        sx={{
          width: 250,
          height: 130,
          borderRadius: "10px",

          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <AccountBalanceIcon
          sx={{
            fontSize: 80,
            color: "white",
            "&:hover": { transform: "scale(1.2)" },
            transition: "transform 0.5s ease-in-out",
          }}
        />
        <Typography
          variant="h6"
          fontWeight={700}
          color="#fff"
          letterSpacing={1}
        >
          Management
        </Typography>
      </Button>

      {/* LAB */}
      <Button
        variant="contained"
        color="error"
        sx={{
          width: 250,
          height: 130,
          borderRadius: "10px",

          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <RoomPreferencesIcon
          sx={{
            fontSize: 80,
            color: "white",
            "&:hover": { transform: "scale(1.2)" },
            transition: "transform 0.5s ease-in-out",
          }}
        />
        <Typography
          variant="h6"
          fontWeight={700}
          color="#fff"
          letterSpacing={1}
        >
          Laboratory
        </Typography>
      </Button>
    </Box>
  );
};

export default F_Data;
