import React, { useState } from "react";
import { ValuesApi } from "../Generated/api";

export const CallApi = () => {
  const [token, setToken] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const callApi = async () => {
    setLoading(true);

    const api = new ValuesApi({
      basePath: "https://localhost:5001",
      apiKey: `Bearer ${token}`
    });
    const result = await api.get(); // try catch would be smart here

    setLoading(false);
    setResult(JSON.stringify(result));
  };

  return (
    <div style={{ flex: 1 }}>
      <h2>Authenticated API</h2>
      <input
        type="text"
        value={token}
        onChange={event => setToken(event.target.value)}
      />
      <br />
      <br />
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <button type="button" onClick={callApi}>
          Call API
        </button>
      )}

      <br />
      <br />
      {result}
    </div>
  );
};
