import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Sign from "../Pages/Sign";
import Home from "../Pages/Home";
import Details from "../Pages/Details";
import Addfile from "../Pages/Addfile";
import PrivateRoute from "./PrivateRoute";

const PublicRoutes = () => {
  return (
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Sign />}></Route>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/details/:_id"
          element={
            <PrivateRoute>
              <Details />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/addfile"
          element={
            <PrivateRoute>
              <Addfile />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
  );
};

export default PublicRoutes;
