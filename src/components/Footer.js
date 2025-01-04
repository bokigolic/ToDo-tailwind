import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-700 text-gray-200 py-6">
      <div className="container mx-auto text-center">
        {/* Logo */}
        <img src="/BG.png" alt="Logo" className="mx-auto mb-4 w-16 h-16" />

        {/* Standardni podaci */}
        <p className="text-sm">
          © {new Date().getFullYear()} Bojan Golić. All Rights Reserved.
        </p>
        <p className="text-sm">
          Designed and developed by <span className="font-semibold">Bojan Golić</span>
        </p>

        {/* Kontakt informacije */}
        <p className="text-sm mt-2">
          Email: <a href="mailto:bojan.golic@example.com" className="text-blue-400 hover:underline">golichbojan@example.com</a>
        </p>
        <p className="text-sm">
          Phone: <a href="tel:+123456789" className="text-blue-400 hover:underline">703 909 0093</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
