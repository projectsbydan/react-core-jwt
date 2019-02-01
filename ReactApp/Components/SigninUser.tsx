import * as React from "react";
import { UsersApi } from "../Generated";
export interface SigninUserProps {}

export interface SigninUserState {
  email: string;
  password: string;
  isLoading: boolean;
}

class SigninUser extends React.Component<SigninUserProps, SigninUserState> {
  constructor(props: SigninUserProps) {
    super(props);
    this.state = { email: "", password: "", isLoading: false };
  }

  handleSignin = async () => {
    this.setState({ isLoading: true });
    const api = new UsersApi({ basePath: "https://localhost:5001" });
    const result = await api.signInUser({
      emailAddress: this.state.email,
      password: this.state.password
    });
    console.log(result);
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <div style={{ flex: 1 }}>
        <h2>Signin user</h2>
        <input
          type="text"
          value={this.state.email}
          onChange={event => this.setState({ email: event.target.value })}
        />
        <br />
        <br />
        <input
          type="password"
          value={this.state.password}
          onChange={event => this.setState({ password: event.target.value })}
        />
        <br />
        <br />
        {this.state.isLoading ? (
          <span>Loading...</span>
        ) : (
          <button type="button" onClick={this.handleSignin}>
            Sign in!
          </button>
        )}
      </div>
    );
  }
}

export default SigninUser;
