# Globetrotter

## Description

Globetrotter is a full-stack web application where users are presented with cryptic clues about a famous place and must guess the destination. Once they guess correctly, they unlock fun fact about the destination!

## Demo

https://globetrotterwebsite.netlify.app/

## Tech Choices

*   **Frontend:**
    *   HTML
    *   CSS
    *   JavaScript
*   **Backend:**
    *   Node.js
    *   Express.js
*   **Database:**
    *   MongoDB Atlas
*   **AI Integration:**
    *   Google AI Studio
*   **Deployment:**
    *   Frontend: Netlify
    *   Backend: Render
*   **Version Control:**
    *   Git
    *   GitHub

## Setup

1.  **Clone the repository:**

    ```bash
    git clone <your_github_repository_url>
    cd globetrotter
    ```

    Replace `<your_github_repository_url>` with the actual URL of your GitHub repository.

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Configure environment variables:**

    *   Create a `.env` file in the `backend/` directory.
    *   Add the following environment variables, replacing the placeholders with your actual values:

        ```
        GOOGLE_API_KEY=YOUR_GOOGLE_AI_STUDIO_API_KEY
        MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
        ```

4.  **Run the backend:**

    ```bash
    node server.js
    ```

5.  **Deploy the Frontend:**

    * Create .env file to store URL 
    * Follow the deployment steps outlined in the Netlify documentation to deploy the frontend.
    *  Add the backend URL in Netlify Environment settings.
*   **Open `frontend/script.js`**
*   **Add code to fetch from the .env url file.**

## Features

*   Presents random clue about a chosen destination.
*   Allows users to select from multiple possible destination answers.
*   Provides immediate feedback after answering (correct/incorrect).
*   Includes a 'Next' button to load a different random destination.
*   Tracks and displays the user's total score (correct and incorrect answers).
*   "Challenge a Friend" feature:
    *   User enters a unique username to create their profile.
    *   Clicking 'Challenge a Friend' opens a share popup with a dynamic invite link for WhatsApp.
    *   Invited friends can see the invitee's score before playing.

## Future Enhancements

*   Create a more visually appealing and interactive user interface.
*   Implement user authentication and persistent profiles.
*   Implement a leaderboard to track high scores.
*   Add more sophisticated "Challenge a Friend" functionality with backend user registration and secure score sharing.