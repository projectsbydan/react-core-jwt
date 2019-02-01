import * as React from "react";
import { render } from "react-dom";
import CreateUser from "./Components/CreateUser";
import SigninUser from "./Components/SigninUser";
import AuthentificatedApi from "./Components/AuthentificatedApi";
import { AuthentificationProvider } from "./Contexts/Authentification";
import { userInfo } from "os";
import UserInfo from "./Components/UserInfo";

const App = () => (
  <AuthentificationProvider>
    <div style={{ display: "flex" }}>
      {/*never ever do inline styles*/}
      <CreateUser />
      <div style={{ flex: 1 }}>
        <SigninUser />
      </div>
      <div style={{ flex: 1 }}>
        <AuthentificatedApi />
      </div>
    </div>
    <UserInfo />
  </AuthentificationProvider>
);

render(<App />, document.getElementById("root"));
