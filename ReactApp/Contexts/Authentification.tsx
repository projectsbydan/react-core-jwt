import * as React from "react";
import { UserLogin } from "../Generated";
export interface AuthentificationProviderProps {}

export interface AuthentificationProviderState {
  userLogin?: UserLogin;
  saveUserLogin: (data) => void;
}

const Context = React.createContext({
  userLogin: undefined,
  saveUserLogin: () => {}
});

export class AuthentificationProvider extends React.Component<
  AuthentificationProviderProps,
  AuthentificationProviderState
> {
  state = {
    saveUserLogin: data => this.setState({ userLogin: data })
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const AuthentificationConsumer = Context.Consumer;
