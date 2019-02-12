import React from "react";
import { LoginContext } from "./loginContext";
import { UserLogin } from "../../Generated/api";

class LoginWrapper extends React.Component {
  state = {
    login: null,
    setLogin: (login: UserLogin) => {
      this.setState({ login });
    }
  };
  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export const withLogin = children => {
  return <LoginWrapper>{children}</LoginWrapper>;
};
