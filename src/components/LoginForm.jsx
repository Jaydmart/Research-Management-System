import React, { useState } from "react";
import { login } from "../api/auth";
import { saveToken } from "../utils/token";

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await login({ email, password });
    if (res.token) {
      saveToken(res.token);
      onLogin(res.user); // Optionally set user state in parent
    } else {
      setError(res.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="text-red-500">{error}</div>}
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
