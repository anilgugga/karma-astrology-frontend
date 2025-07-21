import React from "react";

export default function CosmicCard({ title, children }) {
  return (
    <div className="bg-gradient-to-br from-cardblue to-deepblue rounded-xl shadow-gold-glow border-2 border-gold/60 p-6 mb-8">
      <h2 className="text-xl font-cosmic text-gold mb-4">{title}</h2>
      <div className="text-cosmicwhite">{children}</div>
    </div>
  );
}
