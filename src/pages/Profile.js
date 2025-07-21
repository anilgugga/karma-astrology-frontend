import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Profile() {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  if (!user) return <p className="text-center mt-8">Not logged in. Please <a href="/login" className="text-blue-600">log in</a>.</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Welcome, {user.displayName || user.email}</h2>
      <p className="mb-4">📜 Saved Reports will appear here (placeholder)</p>
      <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded">Logout</button>
    </div>
  );
}

export default Profile;
