import React, { useContext } from "react";
import { LoginContext } from "../Contexts/login/loginContext";

export const UserInfo = () => {
  const loginContext = useContext(LoginContext);

  return (
    <div style={{ margin: "30px auto", textAlign: "center" }}>
      User email:{" "}
      {loginContext.login ? loginContext.login.emailAddress : "not logged in"}
    </div>
  );
};
