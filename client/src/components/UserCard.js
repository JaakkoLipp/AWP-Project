import React from "react";
import { Card } from "react-bootstrap";

function UserCard({ username, bio }) {
  return (
    <Card style={{ width: "18rem" }} className="mb-2">
      <Card.Header>{username}</Card.Header>
      <Card.Body>
        <Card.Title>Hi, I like hedgehogs!</Card.Title>
        <Card.Text>{bio}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
