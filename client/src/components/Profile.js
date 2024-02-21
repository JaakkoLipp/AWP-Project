import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function Profile({ userProfile, onUpdateProfile }) {
  // Assuming userProfile is an object { name: 'John Doe', description: 'Bio here' }
  const [name, setName] = useState(userProfile.name);
  const [description, setDescription] = useState(userProfile.description);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onUpdateProfile prop with the new name and description
    onUpdateProfile({ name, description });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2>Edit Profile</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="profileName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="profileDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe yourself"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default Profile;
