import React, { useState } from "react";

export default function PredictMarriageAgeForm() {
  const [form, setForm] = useState({
    date: "",
    time: "",
    birthplace: "",
    gender: "",
    latitude: "",
    longitude: "",
    timezone: "",
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Auto-detect location
  const handleBirthplaceBlur = async () => {
    if (!form.birthplace.trim()) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/get-location-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ birthplace: form.birthplace }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || err.error || "Failed to get location info");
      }
      const data = await res.json();
      setForm((prev) => ({
        ...prev,
        latitude: data.latitude || "",
        longitude: data.longitude || "",
        timezone: data.timezone || "",
      }));
    } catch (err) {
      setError(err.message);
      setForm((prev) => ({
        ...prev,
        latitude: "",
        longitude: "",
        timezone: "",
      }));
    }
    setLoading(false);
  };

  // Submit handler (dummy, replace with your prediction API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPrediction(null);

    if (
      !form.date ||
      !form.time ||
      !form.birthplace ||
      !form.gender ||
      !form.latitude ||
      !form.longitude ||
      !form.timezone
    ) {
      setError("Please fill all fields and wait for location detection.");
      return;
    }

    setLoading(true);
    // ...call your backend for prediction here...
    setTimeout(() => {
      setPrediction(27); // Dummy value
      setLoading(false);
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto flex flex-col space-y-5 border-2 border-gold"
      style={{
        background: "linear-gradient(135deg, #FFFFFF 90%, #C89F6122 100%)",
      }}
    >
      <h2 className="text-2xl font-bold text-deepblue text-center mb-2 tracking-wider">
        Marriage Age Prediction
      </h2>

      {/* Date Field */}
      <div className="relative">
        <input
          id="date"
          name="date"
          type="text"
          value={form.date}
          onChange={handleChange}
          placeholder=" "
          className="peer block w-full border border-gold rounded px-3 py-2 pt-6 text-deepblue focus:outline-gold bg-white"
          required
        />
        <label
          htmlFor="date"
          className="absolute left-3 top-2 text-gold font-semibold text-sm transition-all duration-150
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
            peer-focus:top-2 peer-focus:text-sm"
        >
          DD.MM.YYYY (e.g. 10.12.1959)
        </label>
      </div>

      {/* Time Field */}
      <div className="relative">
        <input
          id="time"
          name="time"
          type="text"
          value={form.time}
          onChange={handleChange}
          placeholder=" "
          className="peer block w-full border border-gold rounded px-3 py-2 pt-6 text-deepblue focus:outline-gold bg-white"
          required
        />
        <label
          htmlFor="time"
          className="absolute left-3 top-2 text-gold font-semibold text-sm transition-all duration-150
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
            peer-focus:top-2 peer-focus:text-sm"
        >
          HH:MM AM/PM (e.g. 01:30 PM)
        </label>
      </div>

      {/* Birthplace Field */}
      <div className="relative">
        <input
          id="birthplace"
          name="birthplace"
          type="text"
          value={form.birthplace}
          onChange={handleChange}
          onBlur={handleBirthplaceBlur}
          placeholder=" "
          className="peer block w-full border border-gold rounded px-3 py-2 pt-6 text-deepblue focus:outline-gold bg-white"
          required
        />
        <label
          htmlFor="birthplace"
          className="absolute left-3 top-2 text-gold font-semibold text-sm transition-all duration-150
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
            peer-focus:top-2 peer-focus:text-sm"
        >
          City, State, Country (e.g. Delhi, India)
        </label>
      </div>

      {/* Latitude, Longitude, Timezone */}
      <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
        {["latitude", "longitude", "timezone"].map((field) => (
          <div key={field} className="relative flex-1">
            <input
              id={field}
              name={field}
              type="text"
              value={form[field]}
              readOnly
              placeholder=" "
              className="peer block w-full border border-gold rounded px-3 py-2 pt-6 text-cardblue bg-gray-100"
            />
            <label
              htmlFor={field}
              className="absolute left-3 top-2 text-gold font-semibold text-xs transition-all duration-150
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                peer-focus:top-2 peer-focus:text-xs"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)} (auto)
            </label>
          </div>
        ))}
      </div>

      <div className="text-xs text-deepblue/70 italic">
        Latitude, longitude, and timezone are auto-detected from place of birth.
      </div>

      {/* Gender Field */}
      <div className="relative">
        <select
          id="gender"
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
          className="peer block w-full border border-gold rounded px-3 py-2 pt-6 text-deepblue focus:outline-gold bg-white"
        >
          <option value="" disabled hidden></option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <label
          htmlFor="gender"
          className="absolute left-3 top-2 text-gold font-semibold text-sm transition-all duration-150
            peer-focus:top-2 peer-focus:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base"
        >
          Gender
        </label>
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-gold to-deepblue text-white font-bold px-6 py-2 rounded-full shadow-lg hover:from-white hover:to-gold hover:text-gold transition-all flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <span className="animate-spin mr-2">🔄</span>
        ) : (
          <span role="img" aria-label="crystal ball" className="mr-2">🔮</span>
        )}
        Predict Age
      </button>

      {error && (
        <div className="text-accentred font-semibold text-center">{error}</div>
      )}
      {prediction && (
        <div className="text-lg text-center text-gold font-bold mt-4">
          Your predicted age of marriage is: <span className="font-extrabold">{prediction} years</span>
        </div>
      )}
    </form>
  );
}
