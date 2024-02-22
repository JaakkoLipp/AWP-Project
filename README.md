# Tinder Clone Project Documentation

## Introduction

This document provides an overview of the Tinder Clone App, detailing the technology choices, installation guidelines, and a user manual. The Tinder Clone App is a web application that allows users to register, log in, swipe through user profiles, like or dislike them, and chat with matched users.

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
- **React-Bootstrap**: Bootstrap framework designed to be used with React, providing scaling UI elements.

## Installation Guidelines

### Prerequisites

- Node.js
- npm
- MongoDB

### Setup

1. **Clone the repository**:
   `git clone https://github.com/your-github/tinder-clone.git`
2. **Install backend dependencies**:
   ```
   cd tinder-clone
   npm install
   ```
3. **Set up the environment variables**:
   Create (if not created) a `.env` file in the root of your project containing the JWT secret.
   ```
   SECRET=your_jwt_secret
   ```
4. **Start the backend server**:
   `npm start`
5. **Install frontend dependencies**:
   `cd client`
   `npm install`
6. **Start the frontend application**:
   `npm start`

The application should now be running on `http://localhost:3000`, with a default mongodb instance at `mongodb://localhost:27017`.

## User Manual

### Registration and Login

- Users can register for a new account using the "Register" link on the login page.
- Registered users can log in to access the application features.

### Profile Management

- Users can view and edit their profile information from the "Profile" section.

### Swiping and Matching

- Users can swipe right to like a profile or swipe left to dislike.
- Mutual likes between users will result in a match.

### Messaging

- Users can send messages to their matches through the "Messages" section.

### Logout

- Users can log out of the application using the "Logout" button.

## Features Implemented

- User authentication (login/logout/register)
- Profile editing
- Swiping functionality for likes/dislikes
- Matching system
- Real-time messaging
- Responsive design

### Grading / points proposal

- Base 25p
- React 5p
- Swipeable
- Bootstrap
