import { Routes, Route } from "react-router-dom";
import SignIn from "../components/auth/login";
import SignUp from "../components/auth/register";
import UserList from "../components/user-list";
import PrivateRoute from "./protectedRoutes";
import routeNames from "./routeNames";

const Router = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path={routeNames.USERLIST} element={<UserList />} />
      </Route>
      <Route path={routeNames.LOGIN} element={<SignIn />} />
      <Route path={routeNames.REGISTER} element={<SignUp />} />
    </Routes>
  );
};
export default Router;
