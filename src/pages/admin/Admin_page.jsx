import { Fragment, useEffect } from "react";
import Dashboard from "./dashboard/Dashboard";
import { useDispatch } from "react-redux";
import { getTeachers } from "../../Redux/user/T_action";
import Admin_Protection from "./Admin_protection";

const Admin_page = () => {
  Admin_Protection();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeachers());
  }, []);

  return (
    <Fragment>
      <Dashboard />
    </Fragment>
  );
};

export default Admin_page;
