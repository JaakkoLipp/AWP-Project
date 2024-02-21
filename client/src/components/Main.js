import UserCard from "./UserCard";
import LikeButton from "./LikeButtons";
import "./Main.css";
import React, { useState, useEffect } from "react";

function Main() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAuthorized, setIsAuthorized] = useState(true); // State to track authorization status

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/users", {
        headers: { Authorization: `${token}` }, // Ensure correct auth header format
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else if (response.status === 401) {
        setIsAuthorized(false); // Handle unauthorized access, e.g., by redirecting to login
        // Optionally, clear or handle users list when unauthorized
      } else {
        // Handle other errors or response statuses as needed
        console.error(`Fetch error: Status ${response.status}`);
      }
    };

    fetchUsers();
  }, []);

  // Redirect or show a message if not logged in
  if (!isAuthorized) {
    return <div>Please log in to see the users.</div>; // Or redirect to login page
  }

  const handleLikeDislike = async (liked) => {
    const userToLikeDislike = users[currentIndex];
    try {
      if (liked) {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/likes/`, {
          method: "POST",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            likedUserId: userToLikeDislike._id, // Assuming each user has an _id
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send like/dislike");
        }

        const data = await response.json();
        if (data.isMatch) {
          alert("It's a match!");
        }
      }

      setCurrentIndex((prevIndex) => prevIndex + 1);
    } catch (error) {
      console.error("Error handling like/dislike action:", error);
    }
  };

  return (
    <div className="card-div">
      {users.length > currentIndex ? (
        <>
          <UserCard
            username={users[currentIndex].username || "Error"}
            description={
              users[currentIndex].description ||
              "No description has been set by the user yet!"
            }
          />
          <LikeButton
            onLike={() => handleLikeDislike(true)}
            onDislike={() => handleLikeDislike(false)}
          />
        </>
      ) : (
        <p>No more users to show.</p>
      )}
    </div>
  );
}

export default Main;
