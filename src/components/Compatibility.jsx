import React, { useState } from "react";
import axios from "axios";
import { saveCompatibilityReport } from "../utils/saveCompatibilityReport";

export default function Compatibility() {
  const [person1, setPerson1] = useState({
    name: "",
    date_of_birth: "",
    time_of_birth: "",
    place_of_birth: "",
    gender: "",
  });

  const [person2, setPerson2] = useState({
    name: "",
    date_of_birth: "",
    time_of_birth: "",
    place_of_birth: "",
    gender: "",
  });

  const [relationshipType, setRelationshipType] = useState("Marriage");
  const [userNotes, setUserNotes] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (who, field, value) => {
    if (who === 1) setPerson1({ ...person1, [field]: value });
    else setPerson2({ ...person2, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await axios.post("/api/compatibility", {
        person1,
        person2,
        relationship_type: relationshipType,
        user_priority_notes: userNotes,
      });
      setResult(response.data);

      // ✅ Save to Firestore
      saveCompatibilityReport(response.data, person1, person2);
    } catch (err) {
      console.error(err);
      setError("Prediction failed. Please check your input and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-deepblue text-cosmicwhite p-6">
      <div className="max-w-4xl mx-auto bg-cardblue shadow-gold-glow p-6 rounded-xl border border-gold">
        <h1 className="text-3xl font-bold text-gold text-center mb-6">
          💖 AI-Powered Compatibility Check
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((who) => {
            const person = who === 1 ? person1 : person2;
            return (
              <div key={who}>
                <h2 className="text-xl font-bold mb-2 text-white">
                  {who === 1 ? "🔹 Person 1" : "🔸 Person 2"}
                </h2>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={person.name}
                  onChange={(e) => handleChange(who, "name", e.target.value)}
                  required
                  className="w-full p-2 mb-2 rounded bg-deepblue border border-white text-white"
                />
                <input
                  type="date"
                  value={person.date_of_birth}
                  onChange={(e) => handleChange(who, "date_of_birth", e.target.value)}
                  required
                  className="w-full p-2 mb-2 rounded bg-deepblue border border-white text-white"
                />
                <input
                  type="time"
                  value={person.time_of_birth}
                  onChange={(e) => handleChange(who, "time_of_birth", e.target.value)}
                  required
                  className="w-full p-2 mb-2 rounded bg-deepblue border border-white text-white"
                />
                <input
                  type="text"
                  placeholder="Place of Birth"
                  value={person.place_of_birth}
                  onChange={(e) => handleChange(who, "place_of_birth", e.target.value)}
                  required
                  className="w-full p-2 mb-2 rounded bg-deepblue border border-white text-white"
                />
                <select
                  value={person.gender}
                  onChange={(e) => handleChange(who, "gender", e.target.value)}
                  required
                  className="w-full p-2 mb-2 rounded bg-deepblue border border-white text-white"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            );
          })}
          <div className="md:col-span-2 space-y-4 mt-4">
            <select
              value={relationshipType}
              onChange={(e) => setRelationshipType(e.target.value)}
              className="w-full p-2 rounded bg-deepblue border border-white text-white"
            >
              <option value="Marriage">Marriage</option>
              <option value="Dating">Dating</option>
              <option value="Casual">Casual Relationship</option>
            </select>
            <input
              type="text"
              placeholder="Optional Notes or Preferences"
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              className="w-full p-2 rounded bg-deepblue border border-white text-white"
            />

            <button
              type="submit"
              disabled={loading}
              className="py-3 px-6 bg-gold text-deepblue font-bold rounded hover:bg-yellow-400 w-full"
            >
              {loading ? "Checking..." : "💞 Check Compatibility"}
            </button>
          </div>
        </form>

        {error && <div className="text-red-400 mt-4 text-center">{error}</div>}

        {result && (
          <div className="mt-6 bg-deepblue p-4 rounded-xl border border-gold">
            <h2 className="text-xl text-gold font-bold mb-2 text-center">🧠 AI Compatibility Result</h2>
            <div className="text-center text-3xl font-bold text-white">{result.percentage}%</div>
            <div className="mt-4 space-y-2 text-white text-sm">
              {result.sections?.map((section, idx) => (
                <div key={idx}>
                  <strong className="text-gold">{section.section}</strong>: {section.description}{" "}
                  <span className="ml-2 text-gold">({section.score}%)</span>
                </div>
              ))}
              <div><strong className="text-gold">Advice:</strong> {result.advice}</div>
              <div><strong className="text-gold">Summary:</strong> {result.summary}</div>
              <div><strong className="text-gold">AI Explanation:</strong> <i>{result.ai_explanation}</i></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
