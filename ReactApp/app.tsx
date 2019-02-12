import * as React from "react";
import { render } from "react-dom";
import CreateUser from "./Components/CreateUser";
import SigninUser from "./Components/SigninUser";
import AuthentificatedApi from "./Components/AuthentificatedApi";
import UserInfo from "./Components/UserInfo";

const App = () => (
  <React.Fragment>
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
  </React.Fragment>
);

render(<App />, document.getElementById("root"));
