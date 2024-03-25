import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Student_Protection = () => {
  const navigate = useNavigate();
  const { user, isLogout } = useSelector((state) => state.auth);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user?.role !== "student") {
        navigate("/");
      }
    }, 2000); // 2000 milliseconds = 2 detik

    return () => clearTimeout(timeout);
  }, [user, navigate]);

  useEffect(() => {
    if (isLogout) {
      navigate("/");
    }
  }, [isLogout]);
};

export default Student_Protection;
