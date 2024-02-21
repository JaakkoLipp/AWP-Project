import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Form,
  Button,
  InputGroup,
  FormControl,
  Badge,
} from "react-bootstrap";
import "./MessagesPage.css";
// Mock data for contacts
const contacts = [
  { id: 1, name: "SpamBot", unread: 14 },
  { id: 2, name: "User D", unread: 2 },
  { id: 3, name: "James T Kirk", unread: 1 },
  // ... other contacts
];

// Mock data for messages
const mockMessages = {
  1: [{ id: 1, text: "Hello there!", senderId: 1, createdAt: new Date() }],
  // ... other contact messages
};

function MessagesPage() {
  const [selectedContactId, setSelectedContactId] = useState(contacts[0].id);
  const [messages, setMessages] = useState(
    mockMessages[selectedContactId] || []
  );
  const [newMessage, setNewMessage] = useState("");

  const handleSelectContact = (contactId) => {
    setSelectedContactId(contactId);
    setMessages(mockMessages[contactId] || []);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Here you would typically send the message to the backend
    const newMessageObj = {
      id: Date.now(),
      text: newMessage,
      senderId: selectedContactId,
      createdAt: new Date(),
    };
    setMessages([...messages, newMessageObj]);
    setNewMessage("");

    // In a real app, after sending the message, you'd fetch the updated messages list
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={4} md={3} lg={2} className="contacts-list">
          <ListGroup variant="flush">
            {contacts.map((contact) => (
              <ListGroup.Item
                key={contact.id}
                action
                onClick={() => handleSelectContact(contact.id)}
                active={contact.id === selectedContactId}
                className="d-flex justify-content-between align-items-center"
              >
                {contact.name}
                <Badge pill bg="danger">
                  {contact.unread}
                </Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col xs={8} md={9} lg={10} className="chat-area">
          <Card>
            <Card.Header>
              Chat with{" "}
              {contacts.find((contact) => contact.id === selectedContactId)
                ?.name || "..."}
            </Card.Header>
            <Card.Body className="overflow-auto" style={{ height: "500px" }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${
                    msg.senderId === selectedContactId ? "sent" : "received"
                  }`}
                >
                  {msg.text}
                  <br />
                  <small>{msg.createdAt.toLocaleTimeString()}</small>
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
