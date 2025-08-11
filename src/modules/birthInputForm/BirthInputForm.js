// src/modules/birthInputForm/BirthInputForm.js
import React, { useState } from "react";
import axios from "axios";
import { useChart } from "../../context/ChartContext";
import { useNavigate } from "react-router-dom";

export default function BirthInputForm() {
  const { setChartData, setChartInput } = useChart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    birth_date: "",
    birth_time: "",
    latitude: "",
    longitude: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!formData.birth_date || !formData.birth_time) {
      setError("Date and time of birth are required.");
      setLoading(false);
      return;
    }

    const latitude = parseFloat(formData.latitude);
    const longitude = parseFloat(formData.longitude);
    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
      setError("Latitude and Longitude must be valid numbers.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const payload = {
        birth_date: formData.birth_date,
        birth_time: formData.birth_time,
        latitude,
        longitude,
      };

      const response = await axios.post("/birthchart", payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      setChartData(response.data);
      setChartInput(payload);
      navigate("/birth-chart");
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-deepblue font-cosmic text-cosmicwhite p-6">
      <div className="max-w-xl mx-auto bg-cardblue shadow-gold-glow p-6 rounded-xl border border-gold">
        <h2 className="text-3xl font-bold text-center text-gold mb-4">🌀 Birth Chart Generator</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="flex justify-between space-x-2">
            <div className="w-1/2">
              <label className="block text-sm font-semibold">🧭 Latitude</label>
              <input
                type="number"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                step="any"
                className="w-full p-2 rounded bg-deepblue border border-white text-white"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-semibold">🧭 Longitude</label>
              <input
                type="number"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                step="any"
                className="w-full p-2 rounded bg-deepblue border border-white text-white"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-400">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gold text-deepblue py-2 rounded font-bold shadow-gold-glow hover:opacity-90 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Calculating..." : "Generate Chart"}
          </button>
        </form>
      </div>
    </div>
  );
}
