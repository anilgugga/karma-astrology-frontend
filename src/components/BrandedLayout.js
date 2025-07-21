import React from "react";

export default function BrandedLayout({ children }) {
  return (
    <div className="min-h-screen bg-deepblue text-white font-cosmic">
      <header className="flex items-center justify-between px-8 py-6 bg-deepblue shadow-gold-glow">
        <h1 className="text-3xl font-bold text-gold tracking-wider drop-shadow-lg">
          ✦ AstroLux ✦
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="/" className="text-white hover:text-gold">Home</a></li>
            <li><a href="/compatibility" className="text-white hover:text-gold">Compatibility</a></li>
            <li><a href="/reports" className="text-white hover:text-gold">Reports</a></li>
          </ul>
        </nav>
      </header>
      <main className="max-w-3xl mx-auto mt-10 p-8 rounded-2xl bg-cardblue shadow-gold-glow border-2 border-gold">
        {children}
      </main>
      <footer className="text-center py-4 text-gold bg-deepblue border-t border-gold/30 mt-10">
        © 2025 AstroLux — Crafted in the Cosmos
      </footer>
    </div>
  );
}