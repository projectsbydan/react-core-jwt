import React from "react";
import { render } from "react-dom";
import { CreateUser } from "./Components/CreateUser";
import { SignInUser } from "./Components/SigninUser";
import { CallApi } from "./Components/CallApi";
import { UserInfo } from "./Components/UserInfo";
import { withLogin } from "./Contexts/login/loginWrapper";

const App = () => (
  <React.Fragment>
    <div style={{ display: "flex" }}>
      {/*never ever do inline styles*/}
      <CreateUser />
      <div style={{ flex: 1 }}>
        <SignInUser />
      </div>
      <div style={{ flex: 1 }}>
        <CallApi />
      </div>
    </div>
    <UserInfo />
  </React.Fragment>
);

render(withLogin(<App />), document.getElementById("root"));
