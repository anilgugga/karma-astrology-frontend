import React, { useState } from "react";
import RatingSlider from "./RatingSlider";

export default function Details() {
  const [empathy, setEmpathy] = useState(70);
  const [trust, setTrust] = useState(80);
  const [communication, setCommunication] = useState(65);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-semibold">Details Breakdown</h2>

      <RatingSlider
        label="Empathy"
        value={empathy}
        onChange={(e) => setEmpathy(+e.target.value)}
        tooltip="How well you understand and respond to others' emotions."
      />
      <RatingSlider
        label="Trust"
        value={trust}
        onChange={(e) => setTrust(+e.target.value)}
        tooltip="Your ability to build reliable and honest relationships."
      />
      <RatingSlider
        label="Communication"
        value={communication}
        onChange={(e) => setCommunication(+e.target.value)}
        tooltip="How clearly and openly you express yourself."
      />
    </div>
  );
}
