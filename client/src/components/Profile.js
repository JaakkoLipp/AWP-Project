import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Example function to fetch the current description
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/description", {
        headers: {
          Authorization: `Bearer ${token}`,
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

    const response = await fetch("/api/profile/edit-description", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
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

  return (
    <div>
      <h2>Edit Profile Description</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
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
