# Text Only "Tinder Clone" Project Documentation

## Introduction

This document provides an overview of the Tinder Clone App, detailing the technology choices, installation guidelines, and a user manual. This text-only-tinder is a web application that allows users to register, log in, like, dislike or swipe through user profiles, and chat with matched users.

## Installation Guidelines

### Prerequisites

- Node.js
- npm
- MongoDB

### Setup

1. **Clone the repository**:
   ```
   git clone https://github.com/JaakkoLipp/AWP-Project.git
   cd AWP-Project
   ```
2. **(optional) Set up the environment variables**:
   Create or edit a `.env` file in the server folder of the project containing the JWT secret. (default provided)
   ```
   SECRET=your_jwt_secret
   ```
3. **Install dependencies**:
   Automated scripts (2):
   ```
   npm run client-install
   npm run server-install
   ```
   **OR** manually from the root folder (3):
   ```
   npm install
   cd client && npm install
   cd server && npm install
   ```
4. **One command dev-start**:
   ```
   npm run dev
   ```
5. **Start the backend server (Alternative)**:
   ```
   cd server
   npm start
   ```
6. **Start the frontend application (Alternative)**:
   ```
   cd client
   npm start
   ```

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

### Features Implemented

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

## Technical Stack

### Frontend Dependencies

- **React**: A JavaScript library for building user interfaces with efficient, declarative components.
- **React Bootstrap**: A front-end framework rebuilt for React to utilize Bootstrap's components with React.
- **React Router DOM**: A library for handling routing in React applications, allowing for dynamic client-side page transitions.
- **React Swipeable**: Provides touch swipe event handling capabilities for React components.
- **Bootstrap**: The world’s most popular framework for building responsive, mobile-first sites.
- **JWT Decode**: A library for decoding JSON Web Tokens to extract user details on the client side.

### Backend Dependencies

- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web applications.
- **Mongoose**: An elegant MongoDB object modeling tool for Node.js.
- **Passport**, **Passport-JWT**, **Passport-Local**: Authentication middleware for Node.js, used for implementing authentication strategies.
- **Bcrypt**, **Bcryptjs**: Libraries for hashing and comparing hashed passwords.
- **Cors**: A package for providing an Express middleware that can be used to enable CORS.
- **Dotenv**: Loads environment variables from a `.env` file into `process.env`, allowing for configuration management.
- **Express-Session**: Middleware for creating session management in Express applications.
- **Express-Validator**: An Express middleware for server-side data validation.
- **Cookie-Parser**: Middleware for parsing cookies attached to the client request object.
- **Debug**: A tiny JavaScript debugging utility modelled after Node.js core's debugging technique.
- **Morgan**: HTTP request logger middleware for Node.js.

### Development Dependencies

- **Concurrently**: A utility that manages multiple concurrent tasks during development, like running the backend and frontend simultaneously.
- **Nodemon**: A utility that monitors for changes in your source and automatically restarts the server.
- **Cypress**: An end-to-end testing framework for anything that runs in a browser.

#### AI Disclosure

_OpenAI's ChatGPT was used in parts of this project for brainstorming, simplifing and refactoring code to be more readable and efficient._
