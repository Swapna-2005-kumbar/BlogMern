# BlogMern

A full-stack blogging application built with the MERN stack (MongoDB, Express.js, React, Node.js). This platform allows users to create, read, update, and delete blog posts, as well as manage their profiles.

## Features

*   **User Authentication**: Secure user registration, login, and logout using JWT (JSON Web Tokens).
*   **Blog Management**:
    *   Create new blog posts with titles and content.
    *   View a list of all blog posts.
    *   View individual blog post details.
    *   Edit and delete your own blog posts.
*   **User Profiles**: View user-specific information and their published blogs.
*   **Responsive Design**: Modern and attractive user interface built with Tailwind CSS.

## Technologies Used

### Backend (Node.js with Express.js)

*   **Node.js**: JavaScript runtime environment.
*   **Express.js**: Web application framework for Node.js.
*   **MongoDB**: NoSQL database for storing blog posts and user data.
*   **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
*   **jsonwebtoken**: For implementing JWT-based authentication.
*   **bcryptjs**: For hashing passwords securely.
*   **cors**: Middleware for enabling Cross-Origin Resource Sharing.
*   **dotenv**: To load environment variables from a `.env` file.

### Frontend (React)

*   **React**: JavaScript library for building user interfaces.
*   **Vite**: Next-generation frontend tooling for fast development.
*   **React Router DOM**: For declarative routing in React applications.
*   **Axios**: Promise-based HTTP client for making API requests.
*   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
*   **Lucide React**: A collection of beautiful and customizable SVG icons.

## Getting Started

Follow these instructions to set up and run the project locally on your machine.

### Prerequisites

*   Node.js (v14 or higher)
*   npm (v6 or higher) or Yarn
*   MongoDB (running locally or a cloud instance like MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/BlogMern.git
cd BlogMern
```

### 2. Backend Setup

Navigate to the `backend` directory, install dependencies, and set up environment variables.

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add the following environment variables:

```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_very_strong_and_long_secret_key_for_jwt
```

*   Replace `your_mongodb_connection_string` with your MongoDB connection URI (e.g., `mongodb://localhost:27017/bloghub` for a local instance).
*   Replace `a_very_strong_and_long_secret_key_for_jwt` with a strong, random string for JWT signing.

Start the backend server:

```bash
npm start
```

The backend server will run on `http://localhost:5001`.

### 3. Frontend Setup

Open a new terminal, navigate to the `frontend` directory, and install dependencies.

```bash
cd ../frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend application will run on `http://localhost:5173`.

## Usage

1.  **Register**: Open your browser and go to `http://localhost:5173`. Click on "Sign Up" to create a new account.
2.  **Login**: After registration, log in with your new credentials.
3.  **Create Blog**: Once logged in, you can navigate to the "Write" section to create new blog posts.
4.  **View Blogs**: All published blogs will be visible on the homepage. Click on a blog card to view its full content.
5.  **Edit/Delete Blog**: If you are the author of a blog post, you will see options to edit or delete it on the blog details page.
6.  **Profile**: Access your profile page to see your details and a list of your published blogs.

## Contributing

Contributions are welcome! If you have suggestions for improvements or find any bugs, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
