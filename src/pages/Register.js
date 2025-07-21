import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      navigate("/profile");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full p-2 border" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" className="w-full p-2 border" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2">Sign Up</button>
      </form>
    </div>
  );
}

export default Register;
