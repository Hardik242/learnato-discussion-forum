# Learnato Hackathon - Discussion Forum Backend

This is the backend server for the Learnato Discussion Forum microservice. It is built with Node.js, Express, TypeScript, and MongoDB.

## Features

-   **JWT Authentication**: User registration, login, and logout with `httpOnly` cookies.
-   **Post Management**: Create, read (all and by ID).
-   **Replies**: Add replies to posts.
-   **Voting**: Upvote and un-upvote posts (one vote per user).
-   **Validation**: Server-side validation for all user inputs.
-   **Error Handling**: Centralized error handling middleware.
-   **Dockerized**: Ready to be containerized with the included `Dockerfile`.

## Tech Stack

-   Node.js
-   Express.js
-   TypeScript
-   MongoDB (with Mongoose)
-   JSON Web Tokens (JWT)
-   `bcryptjs` for password hashing
-   `express-validator` for input sanitization

## Setup & Installation

1.  **Clone the repository** (or navigate into the `backend` directory).

2.  **Install dependencies**:

    ```sh
    npm install
    ```

3.  **Create an environment file**:
    Create a `.env` file in the `backend` directory and add the following variables:

    ```env
    PORT=5000
    MONGO_URI=mongodb://127.0.0.1:27017/learnatoForum
    JWT_SECRET=averysecretkeyforourhackathon
    JWT_EXPIRES_IN=30d
    ```

    _Note: Make sure you have a MongoDB server running and accessible at the `MONGO_URI`._

4.  **Run the development server**:
    ```sh
    npm run dev
    ```
    The server will start on `http://localhost:5000`.

## API Endpoints

### Auth (`/api/users`)

-   `POST /register`: Register a new user. (Body: `username`, `password`)
-   `POST /login`: Login a user. (Body: `username`, `password`)
-   `POST /logout`: Logout the current user (clears cookie).
-   `GET /me`: Get the currently authenticated user's profile (requires auth).

### Posts (`/api/posts`)

-   `POST /`: Create a new post (requires auth). (Body: `title`, `content`)
-   `GET /`: Get all posts. (Query params: `?sort=votes` or `?sort=date`)
-   `GET /:id`: Get a single post by its ID.
-   `POST /:id/reply`: Add a reply to a post (requires auth). (Body: `content`) -`POST /:id/upvote`: Upvote or un-vupvote a post (requires auth).
