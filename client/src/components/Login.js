import React, { useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  // State for login credentials and error messages
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // useAuth hook provides login function
  const { login } = useAuth();
  const navigate = useNavigate();

  // Handles the login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sends login credentials to the server
      const response = await fetch("/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token); // Calls the login function from useAuth with the received token
        navigate("/"); // Navigates to the home page upon successful login
      } else {
        // Sets an error message if login is unsuccessful
        setErrorMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error); // Logs any network or server error
      setErrorMessage("Login failed with error"); // Set error message for any caught error
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center align-items-center">
      <Card style={{ width: "40%", maxWidth: "600px", minWidth: "200px" }}>
        <Card.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          {errorMessage && (
            <Alert variant="danger" className="mt-3">
              {errorMessage}
            </Alert>
          )}
        </Card.Body>
        <Card.Footer className="text-muted">
          Not registered?{" "}
          <Link as={Link} to="/register">
            Register
          </Link>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default Login;
