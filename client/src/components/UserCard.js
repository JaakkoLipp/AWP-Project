import React from "react";
import { Card } from "react-bootstrap";

function UserCard({ username, description }) {
  return (
    <Card style={{ width: "18rem", height: "18rem" }} className="mb-2">
      <Card.Header>{username}</Card.Header>
      <Card.Body>
        <Card.Title>{description.split(/[\n\s]/)[0]}</Card.Title>
        <Card.Text>
          {description
            .split(/[\n\s]/)
            .slice(1)
            .join(" ")}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
