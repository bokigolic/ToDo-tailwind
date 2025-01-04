import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6">
      <div className="container mx-auto text-center">
        {/* Logo */}
        <img src="/BG.png" alt="Logo" className="mx-auto mb-4 w-16 h-16" />

        {/* Linkovi */}
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://github.com/bokigolic" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/bojan-golic/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
            LinkedIn
          </a>
          <a href="mailto:golichbojan@gmail.com" className="text-blue-400 hover:text-blue-500">
            Email
          </a>
        </div>

        {/* Standardni podaci */}
        <p className="text-sm">
          © {new Date().getFullYear()} Bojan Golić. All Rights Reserved.
        </p>
        <p className="text-sm">
          Designed and developed by <span className="font-semibold">Bojan Golić</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
