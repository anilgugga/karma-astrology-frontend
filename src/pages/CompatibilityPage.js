import React, { useState } from "react";
import axios from "axios";

const CompatibilityPage = () => {
  const [person1, setPerson1] = useState({
    birth_date: "",
    birth_time: "",
    latitude: "",
    longitude: "",
  });

  const [person2, setPerson2] = useState({
    birth_date: "",
    birth_time: "",
    latitude: "",
    longitude: "",
  });

  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "/api/predict-compatibility",
        { person1, person2 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(res.data);
    } catch (error) {
      console.error("Prediction error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Compatibility Predictor</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <h3 className="font-semibold">Person 1</h3>
        <input placeholder="Birth Date" onChange={e => setPerson1({ ...person1, birth_date: e.target.value })} />
        <input placeholder="Birth Time" onChange={e => setPerson1({ ...person1, birth_time: e.target.value })} />
        <input placeholder="Latitude" onChange={e => setPerson1({ ...person1, latitude: parseFloat(e.target.value) })} />
        <input placeholder="Longitude" onChange={e => setPerson1({ ...person1, longitude: parseFloat(e.target.value) })} />

        <h3 className="font-semibold mt-4">Person 2</h3>
        <input placeholder="Birth Date" onChange={e => setPerson2({ ...person2, birth_date: e.target.value })} />
        <input placeholder="Birth Time" onChange={e => setPerson2({ ...person2, birth_time: e.target.value })} />
        <input placeholder="Latitude" onChange={e => setPerson2({ ...person2, latitude: parseFloat(e.target.value) })} />
        <input placeholder="Longitude" onChange={e => setPerson2({ ...person2, longitude: parseFloat(e.target.value) })} />

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      {result && (
        <div className="mt-4">
          <h4 className="font-bold">Result:</h4>
          <p>Compatibility Score: {result.compatibility_score}</p>
          <p>Verdict: {result.verdict}</p>
        </div>
      )}
    </div>
  );
};

export default CompatibilityPage;
