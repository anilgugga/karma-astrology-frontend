import React from "react";

export default function MarriageInsights({ predictedMarriageAge }) {
  const handleFeedback = async (wasAccurate) => {
    const userId =
      localStorage.getItem("user_id") ||
      (() => {
        const id = crypto.randomUUID();
        localStorage.setItem("user_id", id);
        return id;
      })();

    await fetch("/api/feedback/marriage-age", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        predicted_age: predictedMarriageAge,
        was_accurate: wasAccurate,
        timestamp: new Date().toISOString(),
        user_hash: userId,
      }),
    });

    alert("Thank you for your feedback 🌸");
  };

  return (
    <div>
      <p className="text-xl mt-4">
        Estimated Marriage Age: <strong>{predictedMarriageAge} years</strong>
      </p>

      <p className="text-md text-gray-700 mt-4">
        Does this predicted timeline feel aligned with your journey?
      </p>

      <div className="flex gap-3 mt-2">
        <button
          onClick={() => handleFeedback(true)}
          className="px-3 py-1 bg-green-200 text-green-900 rounded hover:bg-green-300"
        >
          🌟 Feels Right
        </button>
        <button
          onClick={() => handleFeedback(false)}
          className="px-3 py-1 bg-red-200 text-red-900 rounded hover:bg-red-300"
        >
          🔁 Not Quite
        </button>
      </div>
    </div>
  );
}