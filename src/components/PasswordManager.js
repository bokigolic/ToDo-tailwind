import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { motion, AnimatePresence } from "framer-motion";
import config from "../config";

const SECRET_KEY = "your_secret_key";

function PasswordManager() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [entries, setEntries] = useState(() => {
    const savedData = localStorage.getItem("passwords");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [newEntry, setNewEntry] = useState({ organization: "", email: "", password: "" });
  const [editIndex, setEditIndex] = useState(null); // Za praćenje indeksa unosa koji se menja
  const [showPasswords, setShowPasswords] = useState(false);

  // Encrypt text
  const encrypt = (text) => CryptoJS.AES.encrypt(text, SECRET_KEY).toString();

  // Decrypt text
  const decrypt = (ciphertext) => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return "Decryption error";
    }
  };

  const addOrUpdateEntry = () => {
    if (!newEntry.organization || !newEntry.email || !newEntry.password) {
      setError("All fields must be filled out.");
      return;
    }
    const encryptedPassword = encrypt(newEntry.password);

    if (editIndex !== null) {
      // Update existing entry
      const updatedEntries = [...entries];
      updatedEntries[editIndex] = { ...newEntry, password: encryptedPassword };
      setEntries(updatedEntries);
      setEditIndex(null); // Reset edit mode
    } else {
      // Add new entry
      const updatedEntries = [...entries, { ...newEntry, password: encryptedPassword }];
      setEntries(updatedEntries);
    }

    setNewEntry({ organization: "", email: "", password: "" });
    setError("");
  };

  const handleEditEntry = (index) => {
    const entryToEdit = entries[index];
    setNewEntry({
      organization: entryToEdit.organization,
      email: entryToEdit.email,
      password: decrypt(entryToEdit.password),
    });
    setEditIndex(index);
  };

  const deleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  const handlePinSubmit = () => {
    const hash = CryptoJS.MD5(pin).toString();
    if (hash === config.passwordManagerPinCodeHash) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid PIN. Please try again.");
    }
  };

  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(entries));
  }, [entries]);

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      {!isAuthenticated ? (
        <div className="text-center">
          <h2 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Passwords
          </h2>
          <p className="text-gray-600 mb-4">Enter your PIN to access your passwords</p>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="border p-3 rounded-lg shadow-md w-64 mb-4 focus:ring-2 focus:ring-purple-400"
            placeholder="Enter 6-digit PIN"
          />
          <button
            onClick={handlePinSubmit}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transform transition-all"
          >
            Submit
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      ) : (
        <>
          <h2 className="text-5xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
            Passwords          </h2>

          {/* Add or Update Entry Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <input
              type="text"
              placeholder="Organization"
              value={newEntry.organization}
              onChange={(e) => setNewEntry({ ...newEntry, organization: e.target.value })}
              className="border p-3 rounded-lg shadow-md w-full mb-4 focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={newEntry.email}
              onChange={(e) => setNewEntry({ ...newEntry, email: e.target.value })}
              className="border p-3 rounded-lg shadow-md w-full mb-4 focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={newEntry.password}
              onChange={(e) => setNewEntry({ ...newEntry, password: e.target.value })}
              className="border p-3 rounded-lg shadow-md w-full mb-4 focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={addOrUpdateEntry}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transform transition-all"
            >
              {editIndex !== null ? "Update Entry" : "Add Entry"}
            </button>
          </div>

          {/* Toggle Show Passwords */}
          <div>
            <button
              onClick={() => setShowPasswords(!showPasswords)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transform transition-all mb-4"
            >
              {showPasswords ? "Hide Passwords" : "Show Passwords"}
            </button>

            {/* Password Entries */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <AnimatePresence>
                {entries.map((entry, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-bold text-gray-800">{entry.organization}</h3>
                    <p className="text-gray-600">Email: {entry.email}</p>
                    <p className="text-gray-600">
                      Password:{" "}
                      <span className="font-mono text-gray-800">
                        {showPasswords ? decrypt(entry.password) : "******"}
                      </span>
                    </p>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleEditEntry(index)}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-lg hover:scale-105 transform transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteEntry(index)}
                        className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-lg hover:scale-105 transform transition"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PasswordManager;
