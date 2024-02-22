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

function MessagesPage() {
  const [contacts, setContacts] = useState([]); // Stores matched contacts
  const [selectedContactId, setSelectedContactId] = useState(null); // ID of the currently selected contact for messaging
  const [messages, setMessages] = useState([]); // Stores messages for the selected contact
  const [newMessage, setNewMessage] = useState(""); // State for the new message input
  const { isAuthenticated } = useAuth();

  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const loggedInUserId = decodedToken ? decodedToken.id : null;

  // Fetch matched contacts when the component mounts
  useEffect(() => {
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
  }, []);

  // Fetch messages for the selected contact
  useEffect(() => {
    const fetchMessages = async () => {
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

  // Handle sending a new message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
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
        const sentMessage = await response.json();
        setMessages([...messages, sentMessage]);
        setNewMessage("");
      } else {
        // Handle failure
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle contact selection
  const handleSelectContact = (id) => {
    setSelectedContactId(id);
  };

  if (!isAuthenticated) {
    return <p>You must be logged in to view messages.</p>;
  }
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
                  key={msg.id}
                  className={`message mb-2 p-2 rounded ${
                    msg.senderId === loggedInUserId
                      ? "bg-primary text-white"
                      : "bg-secondary text-white"
                  }`}
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
