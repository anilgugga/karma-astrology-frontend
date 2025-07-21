// src/modules/birthInputForm/BirthInputForm.js
import React, { useState } from "react";
import axios from "axios";
import { useChart } from "../../context/ChartContext";
import { useNavigate } from "react-router-dom";

export default function BirthInputForm() {
  const { setChartData } = useChart();
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

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "/api/calculate-chart",
        {
          birth_date: formData.birth_date,
          birth_time: formData.birth_time,
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setChartData(response.data); // ✅ Save to context
      navigate("/birth-chart");     // ✅ Redirect to chart view
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Generate Birth Chart</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Time of Birth</label>
          <input
            type="time"
            name="birth_time"
            value={formData.birth_time}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Latitude</label>
          <input
            type="number"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            step="any"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Longitude</label>
          <input
            type="number"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            step="any"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800"
          disabled={loading}
        >
          {loading ? "Calculating..." : "Generate Chart"}
        </button>
      </form>
    </div>
  );
}
