import {
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Typography,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../Redux/auth/auth_action";
import Loader from "../component/Loader/Loader";
import { green, red } from "@mui/material/colors";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AUTH_RESET } from "../../Redux/auth/auth_const";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [role, setRole] = useState("none");

  const [nis, setNis] = useState("");
  const [nip, setNip] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { isAuthLoading, isAuthenticated, user, message, authError } =
    useSelector((state) => state.auth);

  const loginHandler = (e) => {
    e.preventDefault();

    if (role === "student") {
      const data = {
        nis: nis,
        password: password,
      };
      dispatch(auth(data));
    } else if (role === "teacher") {
      const data = {
        nip: nip,
        password: password,
      };

      dispatch(auth(data));
    } else if (role === "staff") {
      const data = {
        email: email,
        password: password,
      };
      dispatch(auth(data));
    }
  };

  const account = (value) => {
    if (role === "student") {
      const number = Number(value);
      setNis(number);
    } else if (role === "teacher") {
      setNip(value);
    } else if (role === "staff") {
      setEmail(value);
    }
  };

  const backHandler = () => {
    setRole("none");
    setNis("");
    setNip("");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success(message);
      localStorage.setItem("login", JSON.stringify("login"));

      if (user?.role === "admin") {
        navigate("/center/admin-dashboard");
      } else if (user?.role === "teacher") {
        navigate("/teacher-dashboard");
      } else if (user?.role === "student") {
        navigate("/student-dashboard");
      }
    } else {
      toast.error(authError);

      dispatch({ type: AUTH_RESET });

      localStorage.removeItem("login");
    }
  }, [isAuthenticated, message, authError, user]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "#acacac",
      }}
    >
      <Box
        sx={{
          width: 400,
          height: 500,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#fff",
          borderRadius: "5px",
          padding: "10px",
          gap: "10px",
        }}
      >
        {isAuthLoading ? (
          <Loader />
        ) : (
          <Box>
            <AccountBalanceIcon sx={{ fontSize: 90, color: "#90528c" }} />
          </Box>
        )}

        <Typography fontWeight="bold" fontSize={30}>
          Login Page
        </Typography>

        {role === "none" && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "10px",
            }}
          >
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: green[700], "&:hover": { bgcolor: green[500] } }}
              onClick={() => setRole("student")}
            >
              STUDENT
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setRole("teacher")}
            >
              TEACHER
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: red[700], "&:hover": { bgcolor: red[500] } }}
              onClick={() => setRole("staff")}
            >
              STAFF
            </Button>
          </Box>
        )}

        {role !== "none" && (
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "100%",
              padding: "10px",
            }}
            onSubmit={loginHandler}
          >
            <Input
              type="text"
              placeholder={
                role === "student"
                  ? "NIS"
                  : role === "teacher"
                  ? "NIP"
                  : "EMAIL"
              }
              sx={{ padding: "5px" }}
              value={
                role === "student" ? nis : role === "teacher" ? nip : email
              }
              onChange={(e) => account(e.target.value)}
              required
            />

            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              sx={{ padding: "5px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handlePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              required
            />

            <Button
              variant="contained"
              type="submit"
              sx={{ bgcolor: "#a6789e", "&:hover": { bgcolor: "#d9afc7" } }}
            >
              Sign In
            </Button>

            <Box
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <IconButton onClick={backHandler}>
                <KeyboardBackspaceIcon />
              </IconButton>
            </Box>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default Login;
