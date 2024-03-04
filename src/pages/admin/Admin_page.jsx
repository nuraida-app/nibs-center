import { Fragment, useEffect } from "react";
import Dashboard from "./dashboard/Dashboard";
import { useDispatch } from "react-redux";
import { getTeachers } from "../../Redux/user/T_action";

const Admin_page = () => {
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
