import React from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Attempt to decode the token and extract user information
  let username = null;
  try {
    if (token) {
      const decodedToken = jwtDecode(token);
      username = decodedToken.username; // Adjust according to your token payload structure
    } else {
      throw new Error("No token found");
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    navigate("/login"); // Redirect to login if the token is invalid or not found
  }

  return (
    <div>
      {username ? (
        <h1>Welcome, {username}</h1> // Display the username extracted from the token
      ) : (
        <p>Please log in first!</p>
      )}
    </div>
  );
}

export default Profile;
