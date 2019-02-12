import * as React from "react";
import { UsersApi } from "../Generated/api";

export interface CreateUserProps {}

export interface CreateUserState {
  email: string;
  password: string;
  isLoading: boolean;
  failedMessage: "";
}

class CreateUser extends React.Component<CreateUserProps, CreateUserState> {
  constructor(props: CreateUserProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      failedMessage: ""
    };
  }
  handleCreate = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const api = new UsersApi({ basePath: "https://localhost:5001" });
    try {
      await api.addUser({
        emailAddress: this.state.email,
        password: this.state.password
      });
    } catch (ex) {
      this.setState({ failedMessage: ex.message });
    }
  };

  render() {
    return (
      <div style={{ flex: 1 }}>
        <h2>Create user</h2>
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
          <button type="button" onClick={this.handleCreate}>
            Create!
          </button>
        )}
        <br />
        <br />
        {this.state.failedMessage}
      </div>
    );
  }
}

export default CreateUser;
