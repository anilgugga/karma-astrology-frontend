import React, { useState } from "react";

export default function CompatibilityForm() {
  const [form, setForm] = useState({
    name1: "",
    name2: "",
    birth_date1: "",
    birth_date2: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://localhost:8000/predict-compatibility-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ message: "Server not responding. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Check Compatibility</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Your Name</label>
          <input
            type="text"
            name="name1"
            value={form.name1}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Your Birth Date</label>
          <input
            type="date"
            name="birth_date1"
            value={form.birth_date1}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Partner's Name</label>
          <input
            type="text"
            name="name2"
            value={form.name2}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Partner's Birth Date</label>
          <input
            type="date"
            name="birth_date2"
            value={form.birth_date2}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Compatibility"}
        </button>
      </form>

      {result && (
        <div className="mt-4 bg-blue-50 p-4 rounded text-blue-900 border border-blue-200">
          <strong>Result:</strong> {result.message}
        </div>
      )}
    </div>
  );
}
