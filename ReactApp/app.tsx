import * as React from "react";
import { render } from "react-dom";
import CreateUser from "./Components/CreateUser";
import SigninUser from "./Components/SigninUser";
import AuthentificatedApi from "./Components/AuthentificatedApi";

const App = () => (
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
);

render(<App />, document.getElementById("root"));
