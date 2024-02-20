import React from "react";
import { Container, Row, Col, ListGroup, Form, Button } from "react-bootstrap";

function Messages() {
  return (
    <Container>
      <Row>
        <Col sm={4}>
          <ListGroup>
            <ListGroup.Item active>SpamBot</ListGroup.Item>
            <ListGroup.Item>User D</ListGroup.Item>
            <ListGroup.Item>James T Kirk</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={8}>
          {/* Message content and input form */}
          <div className="messages">{/* Display messages here */}</div>
          <Form>
            <Form.Group>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Messages;
