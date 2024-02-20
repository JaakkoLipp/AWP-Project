import UserCard from "./UserCard";
import LikeButton from "./LikeButtons";
import "./Main.css";

function MainPage() {
  return (
    <div className="card-div">
      <UserCard username="USER B" bio="Some quick example text..." />
      <LikeButton
        onLike={() => console.log("Liked!")}
        onDislike={() => console.log("Disliked!")}
      />
    </div>
  );
}

export default MainPage;
