import React, { useState } from "react";

function Profile() {
  const [userData, setUserData] = useState(() => JSON.parse(localStorage.getItem("profile")) || {
    name: "John Doe",
    email: "john.doe@example.com",
    registrationDate: "2023-01-01",
    password: "password123",
    bio: "This is your bio. Update it to tell others about yourself.",
    avatar: null,
    status: "Active",
    platforms: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({ ...userData });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [activityLog, setActivityLog] = useState([
    "Logged in on 2023-12-01",
    "Updated bio on 2023-11-25",
    "Changed password on 2023-11-15",
  ]);
  const [newPlatform, setNewPlatform] = useState("");

  const handleSaveChanges = () => {
    if (!updatedData.name || !updatedData.email) {
      alert("Name and email cannot be empty!");
      return;
    }
    setUserData(updatedData);
    localStorage.setItem("profile", JSON.stringify(updatedData));
    setIsEditing(false);
    setActivityLog((prev) => [`Profile updated on ${new Date().toISOString().split("T")[0]}`, ...prev]);
  };

  const handleChangePassword = () => {
    if (currentPassword !== userData.password) {
      alert("Current password is incorrect!");
      return;
    }
    setUserData({ ...userData, password: newPassword });
    localStorage.setItem("profile", JSON.stringify({ ...userData, password: newPassword }));
    setActivityLog((prev) => [`Password changed on ${new Date().toISOString().split("T")[0]}`, ...prev]);
    alert("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserData({ ...userData, avatar: reader.result });
        setUpdatedData({ ...updatedData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addPlatform = () => {
    if (newPlatform.trim()) {
      const updatedPlatforms = [...userData.platforms, newPlatform];
      setUserData({ ...userData, platforms: updatedPlatforms });
      setUpdatedData({ ...updatedData, platforms: updatedPlatforms });
      setNewPlatform("");
      setActivityLog((prev) => [`Added platform ${newPlatform} on ${new Date().toISOString().split("T")[0]}`, ...prev]);
    }
  };

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Profile</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
            {userData.avatar ? (
              <img src={userData.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500 flex items-center justify-center h-full">No Avatar</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="mt-4"
          />
        </div>

        <h2 className="text-2xl font-semibold mb-4">User Information</h2>
        {!isEditing ? (
          <>
            <p className="text-gray-600"><strong>Name:</strong> {userData.name}</p>
            <p className="text-gray-600"><strong>Email:</strong> {userData.email}</p>
            <p className="text-gray-600"><strong>Registration Date:</strong> {userData.registrationDate}</p>
            <p className="text-gray-600"><strong>Status:</strong> {userData.status}</p>
            <p className="text-gray-600"><strong>Bio:</strong> {userData.bio}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              value={updatedData.name}
              onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
              className="border p-2 rounded-lg w-full mb-4"
              placeholder="Name"
            />
            <input
              type="email"
              value={updatedData.email}
              onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
              className="border p-2 rounded-lg w-full mb-4"
              placeholder="Email"
            />
            <textarea
              value={updatedData.bio}
              onChange={(e) => setUpdatedData({ ...updatedData, bio: e.target.value })}
              className="border p-2 rounded-lg w-full mb-4"
              placeholder="Bio"
            />
            <select
              value={updatedData.status}
              onChange={(e) => setUpdatedData({ ...updatedData, status: e.target.value })}
              className="border p-2 rounded-lg w-full mb-4"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="flex gap-4">
              <button
                onClick={handleSaveChanges}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>

      {/* Password Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="border p-2 rounded-lg w-full mb-4"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 rounded-lg w-full mb-4"
        />
        <button
          onClick={handleChangePassword}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Change Password
        </button>
      </div>

      {/* Activity Log */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
        <ul className="list-disc list-inside">
          {activityLog.map((activity, index) => (
            <li key={index} className="text-gray-600">{activity}</li>
          ))}
        </ul>
      </div>

      {/* Linked Platforms */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-semibold mb-4">Linked Platforms</h2>
        <ul className="list-disc list-inside">
          {userData.platforms.map((platform, index) => (
            <li key={index} className="text-gray-600">{platform}</li>
          ))}
        </ul>
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-lg shadow-lg text-center mb-6">
          <h1 className="text-4xl font-bold">Welcome, {userData.name}!</h1>
          <p className="text-lg mt-2">Glad to have you back. Let's make today productive!</p>
        </div>
        <div className="flex gap-4 mt-4">
          <input
            type="text"
            value={newPlatform}
            onChange={(e) => setNewPlatform(e.target.value)}
            className="border p-2 rounded-lg w-full"
            placeholder="Add new platform"
          />
          <button
            onClick={addPlatform}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
