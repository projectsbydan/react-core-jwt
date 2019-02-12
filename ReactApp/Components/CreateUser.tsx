import React, { useState } from "react";
import { UsersApi } from "../Generated/api";

export const CreateUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreate = async () => {
    setLoading(true);
    const api = new UsersApi({ basePath: "https://localhost:5001" });
    try {
      const newUser = await api.addUser({
        emailAddress: email,
        password: password
      });

      setMessage(JSON.stringify(newUser));
    } catch (ex) {
      setMessage(ex.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ flex: 1 }}>
      <h2>Create user</h2>
      <input
        type="text"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <br />
      <br />
      <input
        type="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      <br />
      <br />
      {loading ? (
        <span>Loading...</span>
      ) : (
        <button type="button" onClick={handleCreate}>
          Create!
        </button>
      )}
      <br />
      <br />
      {message}
    </div>
  );
};
