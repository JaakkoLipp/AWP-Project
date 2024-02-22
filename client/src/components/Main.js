import UserCard from "./UserCard";
import LikeButton from "./LikeButtons";
import "./Main.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Main() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("Please log in to use the app.");
      navigate("/login");
    }
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/users", {
        headers: { Authorization: `${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else if (response.status === 401) {
        setIsAuthorized(false);
      } else {
        console.error(`Fetch error: Status ${response.status}`);
      }
    };
    if (isAuthorized) {
      fetchUsers();
    }
  }, [isAuthenticated, isAuthorized, navigate]);

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
            likedUserId: userToLikeDislike._id,
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
