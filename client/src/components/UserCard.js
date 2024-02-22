import React from "react";
import { Card } from "react-bootstrap";

function UserCard({ username, description }) {
  return (
    <Card
      style={{
        width: "40%",
        height: "40%",
        maxWidth: "600px",
        minWidth: "300px",
        minHeight: "300px",
        maxHeight: "600px",
      }}
      className="mb-2"
    >
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
