import React, { useState } from "react";
export default function RelationshipReflectionForm() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("/relationship-reflection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Describe the relationship..."
        className="w-full p-2 border rounded mb-2"
        rows={4}
      />
      <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Analyze</button>
      {result && <pre className="mt-4 bg-gray-100 p-4 rounded">{JSON.stringify(result, null, 2)}</pre>}
    </form>
  );
}
