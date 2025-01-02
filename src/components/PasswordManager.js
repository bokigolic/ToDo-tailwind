import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import config from "../config";

const SECRET_KEY = "your_secret_key"; // Jaka tajna šifra za AES

function PasswordManager() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [entries, setEntries] = useState(() => {
    const savedData = localStorage.getItem("passwords");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [newEntry, setNewEntry] = useState({ organization: "", email: "", password: "" });
  const [showPasswords, setShowPasswords] = useState(false);

  // Funkcija za šifrovanje teksta
  const encrypt = (text) => {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  };

  // Funkcija za dešifrovanje teksta
  const decrypt = (ciphertext) => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return "Decryption error";
    }
  };

  // Dodaj novi unos
  const addEntry = () => {
    if (newEntry.organization && newEntry.email && newEntry.password) {
      const encryptedPassword = encrypt(newEntry.password);
      const updatedEntries = [...entries, { ...newEntry, password: encryptedPassword }];
      setEntries(updatedEntries);
      setNewEntry({ organization: "", email: "", password: "" });
    }
  };

  // Validacija PIN-a
  const handlePinSubmit = () => {
    const hash = CryptoJS.MD5(pin).toString();
    console.log("Generated hash:", hash); // Log za proveru hash vrednosti
    if (hash === config.passwordManagerPinCodeHash) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid PIN. Please try again.");
    }
  };

  // Brisanje unosa
  const deleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  // Čuvanje u lokalnom skladištu
  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(entries));
  }, [entries]);

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      {!isAuthenticated ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Enter PIN to Access Password Manager</h2>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="border p-2 rounded mb-4 w-64"
            placeholder="Enter 6-digit PIN"
          />
          <button
            onClick={handlePinSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Submit
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      ) : (
        <>
          <h2 className="text-4xl font-bold mb-6 text-center">Password Manager</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <input
              type="text"
              placeholder="Organization"
              value={newEntry.organization}
              onChange={(e) => setNewEntry({ ...newEntry, organization: e.target.value })}
              className="border p-2 w-full rounded mb-4"
            />
            <input
              type="email"
              placeholder="Email"
              value={newEntry.email}
              onChange={(e) => setNewEntry({ ...newEntry, email: e.target.value })}
              className="border p-2 w-full rounded mb-4"
            />
            <input
              type="password"
              placeholder="Password"
              value={newEntry.password}
              onChange={(e) => setNewEntry({ ...newEntry, password: e.target.value })}
              className="border p-2 w-full rounded mb-4"
            />
            <button
              onClick={addEntry}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Add Entry
            </button>
          </div>

          <div>
            <button
              onClick={() => setShowPasswords(!showPasswords)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-4"
            >
              {showPasswords ? "Hide Passwords" : "Show Passwords"}
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {entries.map((entry, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-lg">
                  <h3 className="text-lg font-bold">{entry.organization}</h3>
                  <p>Email: {entry.email}</p>
                  <p>
                    Password: {showPasswords ? decrypt(entry.password) : "******"}
                  </p>
                  <button
                    onClick={() => deleteEntry(index)}
                    className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PasswordManager;
