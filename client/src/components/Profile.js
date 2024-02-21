import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import UserCard from "./UserCard";
import { jwtDecode } from "jwt-decode";
import "./Profile.css";

function Profile() {
  const { isAuthenticated } = useAuth();
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Or wherever you've stored the token
    if (token) {
      const decodedToken = jwtDecode(token);
      const username = decodedToken.username; // Assuming the payload contains the username
      setUsername(username);
    }
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/description", {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setDescription(data.description); // Set the fetched description
      } else if (response.status === 401) {
        navigate("/login"); // Redirect to login if not authenticated
      }
    };

    fetchProfile();
  }, [navigate]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch("/api/edit-description", {
      method: "PATCH",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }),
    });

    if (response.ok) {
      // Handle success
      alert("Description updated successfully.");
    } else {
      // Handle failure
      alert("Failed to update description.");
    }
  };

  if (!isAuthenticated) {
    return <p>You must be logged in to edit your profile.</p>;
  }

  return (
    <div className="Profile">
      <h3>Your Profile</h3>
      <UserCard username={username} bio={description} />
      <br></br>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Edit Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Description
        </Button>
      </Form>
    </div>
  );
}

export default Profile;
