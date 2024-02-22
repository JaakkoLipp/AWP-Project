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
    if (!isAuthenticated) {
      console.log("Please log in to edit profile.");
      navigate("/login");
    }
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const username = decodedToken.username;
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
        setDescription(data.description || "");
      } else if (response.status === 401) {
        navigate("/login");
      }
    };

    fetchProfile();
  }, [isAuthenticated, navigate]);

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
      alert("Description updated successfully.");
    } else {
      alert("Failed to update description.");
    }
  };

  if (!isAuthenticated) {
    return <p>You must be logged in to edit your profile.</p>;
  }

  return (
    <div className="Profile">
      <h3>Your Profile</h3>
      <UserCard username={username} description={description} />
      <br></br>
      <Form style={{ "margin-top": "32px" }} onSubmit={handleSubmit}>
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
