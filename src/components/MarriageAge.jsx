import React, { useState } from "react";
import axios from "axios";
import MarriageInsights from "./MarriageInsights";

const MarriageAge = () => {
  const [formData, setFormData] = useState({
    birth_date: "",
    birth_time: "",
    birth_place: "",
    latitude: "",
    longitude: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post("/api/marriage-age", formData);
      setResult(response.data); // { age, zodiac_sign, explanation }
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-deepblue font-cosmic text-cosmicwhite p-6">
      <div className="max-w-xl mx-auto bg-cardblue shadow-gold-glow p-6 rounded-xl border border-gold">
        <h1 className="text-3xl font-bold text-center text-gold mb-4">
          💍 MARRIAGE AGE PREDICTION 💍
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date of Birth */}
          <div>
            <label className="block mb-1 font-semibold">📅 Date of Birth</label>
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              className="w-full p-2 rounded bg-deepblue border border-white text-white"
              required
            />
          </div>

          {/* Time of Birth */}
          <div>
            <label className="block mb-1 font-semibold">⏰ Time of Birth</label>
            <input
              type="time"
              name="birth_time"
              value={formData.birth_time}
              onChange={handleChange}
              className="w-full p-2 rounded bg-deepblue border border-white text-white"
              required
            />
          </div>

          {/* Place of Birth */}
          <div>
            <label className="block mb-1 font-semibold">📍 Place of Birth</label>
            <input
              type="text"
              name="birth_place"
              value={formData.birth_place}
              onChange={handleChange}
              placeholder="City, Country (e.g. Delhi, India)"
              className="w-full p-2 rounded bg-deepblue border border-white text-white"
              required
            />
          </div>

          {/* Latitude, Longitude, Timezone */}
          <div className="flex justify-between space-x-2">
            <div className="w-1/3">
              <label className="block text-sm font-semibold">🧭 Latitude</label>
              <input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="Auto-detected"
                className="w-full p-2 rounded bg-deepblue border border-white text-white"
              />
            </div>
            <div className="w-1/3">
              <label className="block text-sm font-semibold">🧭 Longitude</label>
              <input
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="Auto-detected"
                className="w-full p-2 rounded bg-deepblue border border-white text-white"
              />
            </div>
            <div className="w-1/3">
              <label className="block text-sm font-semibold">🌐 Timezone</label>
              <input
                type="text"
                disabled
                value="Auto-detected"
                className="w-full p-2 rounded bg-deepblue border border-white text-white"
              />
            </div>
          </div>

          <p className="text-xs text-center mt-1 text-white/70">
            Latitude, longitude, and timezone are automatically detected from your place of birth.
          </p>

          {/* Gender */}
          <div>
            <label className="block mb-1 font-semibold">⚧ Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 rounded bg-deepblue border border-white text-white"
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded bg-gold text-deepblue font-bold hover:bg-yellow-400 transition"
          >
            {loading ? "Calculating..." : "🔮 Predict My Marriage Age"}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="mt-4 text-red-500 text-center font-semibold">{error}</div>
        )}

        {/* Result */}
        {result && (
          <div className="mt-6 p-4 border border-gold rounded-xl text-center bg-deepblue">
            <h2 className="text-2xl text-gold font-bold mb-2">✨ Your Marriage Age Prediction ✨</h2>
            <p className="text-4xl font-bold text-white mb-2">{result.age} years</p>
            <p className="text-sm text-white/80 mb-2">
              Based on your birth chart analysis, planetary positions, and astrological
              calculations, your predicted marriage age is <strong>{result.age}</strong> years.
            </p>
            {result.zodiac_sign && (
              <p className="text-sm">
                Zodiac Sign: <strong>{result.zodiac_sign}</strong>
              </p>
            )}
            {result.explanation && (
              <p className="text-sm mt-2 italic text-white/70">{result.explanation}</p>
            )}

            {/* Feedback */}
            <MarriageInsights predictedMarriageAge={result.age} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MarriageAge;
