import React from "react";
import "./Menu.css";

function Menu() {
  return (
    <div className="menu">
      <ul className="menu-list">
        <li>Edit your information</li>
        <li>Add new image</li>
        <li>List your chats (3)</li>
        <li>Logout</li>
      </ul>
    </div>
  );
}

export default Menu;
