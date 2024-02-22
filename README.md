# Text Only "Tinder Clone" Project Documentation

## Introduction

This document provides an overview of the Tinder Clone App, detailing the technology choices, installation guidelines, and a user manual. The Tinder Clone App is a web application that allows users to register, log in, like, dislike or swipe through user profiles, and chat with matched users.

## Technology Choices

### Frontend

- **React**: A JavaScript library for building user interfaces. React's component-based architecture was chosen for its modularity and responsiveness.
- **React Bootstrap**: A front-end framework rebuilt for React. It was used to expedite the development process with ready-to-use components that are responsive and customizable.
- **React Router**: This library was integrated for declarative routing within the React application.

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js was selected for its non-blocking, event-driven architecture, which is ideal for real-time applications like a dating app.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **MongoDB**: A NoSQL database program, MongoDB uses JSON-like documents with schema. It was chosen for its scalability and flexibility with large amounts of data and queries.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data and provides schema validation.
- **Passport**: An authentication middleware for Node.js, Passport was used to authenticate requests, which is done through an extensible set of plugins known as strategies.
- **JWT (JSON Web Tokens)**: For secure transmission of information between parties as a JSON object, JWT was used for creating data with optional signature and/or optional encryption.

### Additional notable Libraries and Tools

- **react-swipeable**: A library that provides swipeable components for React, allowing for the integration of swipe gestures.
- **bcrypt**: A library to help hash passwords.
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
- **React-Bootstrap**: Bootstrap framework designed to be used with React, providing responsive design UI elements.

## Installation Guidelines

### Prerequisites

At least:

- Node.js
- npm
- MongoDB

### Setup

1. **Clone the repository**:
   `git clone https://github.com/JaakkoLipp/AWP-Project.git`
2. **Install backend dependencies**:
   ```
   cd AWP-Project
   npm install
   ```
3. **Set up the environment variables**:
   Create or edit a `.env` file in the root of your project containing the JWT secret.
   ```
   SECRET=your_jwt_secret
   ```
4. **Install dependencies**:
   Automated scripts (2):
   ```
   npm run client-install
   npm run server-install
   ```
   manually from the root folder (3):
   `npm install`
   `cd client && npm install`
   `cd server && npm install`
5. **One command dev-start**:
   `npm run dev`
6. **Start the backend server**:
   `npm start`
7. **Start the frontend application**:
   `npm start`

"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"client-install": "npm install && cd client && npm install",
"dev:client": "cd client && npm start",
"server-install": "cd server && npm install",
"dev:server": "cd server && npm run dev",
"build": "cd client && npm run build",
"dev": "concurrently \"npm run dev:client\" \"npm run dev:server\""
},
The application should now be running on `http://localhost:3000`, with a default mongodb instance at `mongodb://localhost:27017`.

## User Manual

### Registration and Login

- Users can register for a new account using the "Register" page or the Register link on the login page.
- Registered users can log in to access the application features.

### Profile Management

- Users can view and edit their profile description from the "Profile" page.

### Swiping and Matching

- Users can swipe right to like a profile or swipe left to dislike.
- Mutual likes between users will result in a match.
- NOTE: for testing reasons, users are set to repeat on the main page, however duplicate likes and matches will not be added to the database.

### Messaging

- Users can send messages to their matches through the "Match-Messages" page.

### Logout

- Users can log out of the application using the "Logout" button.

## Features Implemented

- User authentication with JWT (login/logout/register)
- Profile editing
- Swiping functionality for likes/dislikes
- Matching system
- Messaging between matched users
- Responsive design
- React Frontend
- Express/Node.js Backend

## Grading / points proposal

- Base functionality +25p
- React +5p
- Swipeable +2p
- React-Bootstrap +1p
- Timestamp in chat messages +2p
- Start chat immediately +2p

#### AI Disclosure

_OpenAI's ChatGPT was used in parts of this project for brainstorming, simplifing and refactoring code to be more readable and cleaner._
