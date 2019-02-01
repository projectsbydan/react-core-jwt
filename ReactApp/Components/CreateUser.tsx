import * as React from "react";
import { UsersApi } from "../Generated";

export interface CreateUserProps {}

export interface CreateUserState {
  email: string;
  password: string;
  isLoading: boolean;
}

class CreateUser extends React.Component<CreateUserProps, CreateUserState> {
  constructor(props: CreateUserProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false
    };
  }
  handleCreate = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const api = new UsersApi({ basePath: "https://localhost:5001" });
    await api.addUser({
      emailAddress: this.state.email,
      password: this.state.password
    });
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
      </div>
    );
  }
}

export default CreateUser;
