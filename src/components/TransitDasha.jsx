import React, { useState } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const TransitDasha = () => {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const transitData = await fetch("https://your-backend.onrender.com/api/transit", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ date: birthDate, time: birthTime }),
      }).then((res) => res.json());

      const dashaData = await fetch("https://your-backend.onrender.com/api/dasha", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ birth_date: birthDate, birth_time: birthTime }),
      }).then((res) => res.json());

      const combinedResult = { transitData, dashaData };

      setResult(combinedResult);

      const user = auth.currentUser;
      if (user) {
        await addDoc(
          collection(db, `users/${user.uid}/transitDashaReports`),
          {
            birthDate,
            birthTime,
            result: combinedResult,
            createdAt: serverTimestamp(),
          }
        );
      }

    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="bg-[#0B0F2F] p-6 rounded-lg shadow-lg border-2 border-yellow-500 w-full max-w-3xl mb-8">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Transit & Dasha Predictions</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="bg-[#1B1F4F] text-yellow-200 p-2 rounded border border-yellow-500"
          required
        />
        <input
          type="time"
          value={birthTime}
          onChange={(e) => setBirthTime(e.target.value)}
          className="bg-[#1B1F4F] text-yellow-200 p-2 rounded border border-yellow-500"
          required
        />
        <button
          type="submit"
          className="bg-yellow-400 text-[#0B0F2F] font-bold py-2 rounded hover:bg-yellow-500"
          disabled={loading}
        >
          {loading ? "Calculating..." : "Get Transit & Dasha"}
        </button>
      </form>

      {result && (
        <div className="mt-6 flex flex-col md:flex-row gap-4 text-sm">
          <div className="flex-1 bg-[#1B1F4F] p-3 rounded border border-yellow-500">
            <h3 className="font-bold mb-2 text-yellow-300">Transit</h3>
            <pre className="whitespace-pre-wrap break-words text-yellow-200">{JSON.stringify(result.transitData, null, 2)}</pre>
          </div>
          <div className="flex-1 bg-[#1B1F4F] p-3 rounded border border-yellow-500">
            <h3 className="font-bold mb-2 text-yellow-300">Dasha</h3>
            <pre className="whitespace-pre-wrap break-words text-yellow-200">{JSON.stringify(result.dashaData, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransitDasha;
