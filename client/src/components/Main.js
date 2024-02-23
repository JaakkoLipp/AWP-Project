import UserCard from "./UserCard";
import LikeButton from "./LikeButtons";
import "./Main.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Main() {
  const [users, setUsers] = useState([]);
  // Current index for swiping through users
  const [currentIndex, setCurrentIndex] = useState(0);
  // State to track if user is authorized
  const [isAuthorized, setIsAuthorized] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Effect for redirecting unauthenticated users and fetching user profiles
  useEffect(() => {
    if (!isAuthenticated) {
      console.log("Please log in to use the app.");
      navigate("/login");
      return;
    }

    // Function to fetch user profiles
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/users", {
        headers: { Authorization: `${token}` },
      });

      // Handling fetch response
      if (response.ok) {
        const data = await response.json();
        setUsers(data); // Update state with fetched users
      } else if (response.status === 401) {
        setIsAuthorized(false); // Update authorization state
      } else {
        console.error(`Fetch error: Status ${response.status}`);
      }
    };

    // Fetch users if authorized
    if (isAuthorized) {
      fetchUsers();
    }
  }, [isAuthenticated, isAuthorized, navigate]);

  // Function to handle like or dislike actions
  const handleLikeDislike = async (liked) => {
    const userToLikeDislike = users[currentIndex];
    try {
      // Process like
      if (liked) {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/likes/`, {
          method: "POST",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            likedUserId: userToLikeDislike._id, // ID of the liked user
          }),
        });

        // Throw error if response is not ok
        if (!response.ok) {
          throw new Error("Failed to send like/dislike");
        }

        const data = await response.json();
        // Alert if match
        if (data.isMatch) {
          alert("It's a match!");
        }
      }

      // Show next user
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } catch (error) {
      console.error("Error handling like/dislike action:", error);
    }
  };

  // Guard clause for unauthenticated users
  if (!isAuthenticated) {
    return <p>You must be logged in to use the app.</p>;
  }

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
            onLike={() => handleLikeDislike(true)}
            onDislike={() => handleLikeDislike(false)}
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
