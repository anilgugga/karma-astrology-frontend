import React, { useState } from "react";

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.access_token) {
        localStorage.setItem("token", data.access_token);
        setError("");
        onLoginSuccess();
      } else {
        setError(data.detail || "Login failed");
      }
    } catch (err) {
      setError("An error occurred during login");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Log In
        </button>
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
