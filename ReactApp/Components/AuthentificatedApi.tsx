import * as React from "react";
import { ValuesApi } from "../Generated";
export interface AuthentificatedApiProps {}

export interface AuthentificatedApiState {
  token: string;
  isLoading: boolean;
  result: string;
}

class AuthentificatedApi extends React.Component<
  AuthentificatedApiProps,
  AuthentificatedApiState
> {
  constructor(props: AuthentificatedApiProps) {
    super(props);
    this.state = { token: "", isLoading: false, result: "" };
  }

  callApi = async () => {
    this.setState({ isLoading: true });

    const api = new ValuesApi({
      basePath: "https://localhost:5001",
      apiKey: `Bearer ${this.state.token}`
    });
    const result = await api.get(); // try catch would be smart here

    this.setState({ isLoading: false, result: JSON.stringify(result) });
  };

  render() {
    return (
      <div style={{ flex: 1 }}>
        <h2>Authenticated API</h2>
        <input
          type="text"
          value={this.state.token}
          onChange={event => this.setState({ token: event.target.value })}
        />
        <br />
        <br />
        {this.state.isLoading ? (
          <span>Loading...</span>
        ) : (
          <button type="button" onClick={this.callApi}>
            Call API
          </button>
        )}

        <br />
        <br />
        {this.state.result}
      </div>
    );
  }
}

export default AuthentificatedApi;
