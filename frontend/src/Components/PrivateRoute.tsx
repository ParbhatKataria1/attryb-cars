import { Navigate } from "react-router-dom";
import { ReactNodeSchema, SessionSchema } from "../Utils";
import { Box } from "@chakra-ui/react";

const PrivateRoute = ({ children }: ReactNodeSchema) => {
  if (sessionStorage.getItem("login_cred")) {
    const { token = "", email = "" } = JSON.parse(
      sessionStorage.getItem("login_cred") || ""
    );
    console.log(token, email)
    if (!email || !token) {
      return <Navigate to="login" />;
    }
  }else return <Navigate to="login" />;

  return <Box>{children}</Box>;
};

export default PrivateRoute;
