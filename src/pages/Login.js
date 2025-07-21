import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border" />
        <button type="submit" className="w-full bg-green-600 text-white py-2">Log In</button>
      </form>
    </div>
  );
}

export default Login;
