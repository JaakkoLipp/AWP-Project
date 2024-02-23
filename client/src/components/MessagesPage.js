import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function MessagesPage() {
  const [contacts, setContacts] = useState([]); // Stores matched users
  const [selectedContactId, setSelectedContactId] = useState(null); // ID of the currently selected contact on the sidebar
  const [messages, setMessages] = useState([]); // Stores messages for the selected contact
  const [newMessage, setNewMessage] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Decode user ID from stored JWT token
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const loggedInUserId = decodedToken ? decodedToken.id : null;

  // Fetch matched contacts when the component mounts
  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      console.log("Please log in to use the messages.");
      navigate("/login");
      return;
    }

    // Fetch and set matched contacts
    const fetchMatchedUsers = async () => {
      const response = await fetch("/api/matches", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      if (response.ok) {
        const data = await response.json();
        setContacts(data.matches);
      } else {
        console.error("Failed to fetch matches");
      }
    };

    fetchMatchedUsers();
  }, [isAuthenticated, navigate]);

  // Fetch messages for selected contact
  useEffect(() => {
    const fetchMessages = async () => {
      // Exit if no contact is selected
      if (!selectedContactId) return;
      const response = await fetch(`/message/${selectedContactId}`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        // Handle failure
        console.error("Failed to fetch messages");
      }
    };

    fetchMessages();
  }, [selectedContactId]);

  // New message to backend
  const sendMessage = async (e) => {
    e.preventDefault();
    // Prevent empty messages
    if (!newMessage.trim()) return;

    // Guard clause for unauthenticated users
    if (!isAuthenticated) {
      return <p>You must be logged in to view messages.</p>;
    }

    // Post message to server
    try {
      const response = await fetch("/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          recipient: selectedContactId,
          content: newMessage,
        }),
      });
      if (response.ok) {
        const sentMessage = await response.json(); // Update local message list
        setMessages([...messages, sentMessage]); // Clear input field
        setNewMessage("");
      } else {
        // Handle failure
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Updates the currently selected contact on sidebar
  const handleSelectContact = (id) => {
    setSelectedContactId(id);
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={4} md={3} lg={2} className="contacts-list">
          <ListGroup variant="flush">
            {contacts.map((contact) => (
              <ListGroup.Item
                key={contact._id}
                action
                onClick={() => handleSelectContact(contact._id)}
                active={contact._id === selectedContactId}
                className="d-flex justify-content-between align-items-center"
              >
                {contact.username}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col xs={8} md={9} lg={10} className="chat-area">
          <Card>
            <Card.Header>
              Chat with{" "}
              {contacts.find((contact) => contact._id === selectedContactId)
                ?.username || "Select a user to start chatting"}
            </Card.Header>
            <Card.Body
              className="overflow-auto d-flex flex-column"
              style={{ height: "500px" }}
            >
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`message mb-2 p-2 rounded ${
                    msg.sender === loggedInUserId
                      ? "bg-primary text-white align-self-end text-end"
                      : "bg-secondary text-white align-self-start text-start"
                  }`}
                  style={{ width: "80%" }}
                >
                  {msg.content}
                  <br />
                  <small>{new Date(msg.createdAt).toLocaleTimeString()}</small>
                </div>
              ))}
            </Card.Body>
            <Card.Footer>
              <Form onSubmit={sendMessage}>
                <InputGroup>
                  <FormControl
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button variant="primary" type="submit">
                    Send
                  </Button>
                </InputGroup>
              </Form>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MessagesPage;
