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

5.  **Deploy the Frontend to Netlify:**

### Part 1: Deploying the Frontend to Netlify

1.  **Sign Up for Netlify:**

    *   Go to [https://www.netlify.com/](https://www.netlify.com/) and click "Sign up."
    *   Choose the "Sign up with GitHub" option for the easiest integration.

2.  **Authorize Netlify:**

    *   Netlify will ask you to authorize access to your GitHub account. Grant the necessary permissions.

3.  **Create a New Site:**

    *   Once authorized, click the "New site from Git" button.

4.  **Select Your Repository:**

    *   Choose your Globetrotter GitHub repository from the list.

5.  **Configure Build Options:**

    *   **Branch to deploy:** Select `main` (or whatever branch you're using for your production code).
    *   **Build command:** Leave this blank (since you don't have a build process).
    *   **Publish directory:** Enter `frontend` (this tells Netlify where your HTML, CSS, and JavaScript files are located).
    *   Click "Deploy site".

6.  **Wait for Deployment:**

    *   Netlify will automatically build and deploy your site. You'll see a progress indicator.
    *   Once the deployment is complete, Netlify will provide you with a unique URL for your site (e.g., `https://your-site-name.netlify.app`).

7.  **Verify Deployment:**

    *   Click the URL to visit your deployed frontend. You should see your Globetrotter game!

### Part 2: Deploying the Backend to Render

1.  **Sign Up for Render:**

    *   Go to [https://render.com/](https://render.com/) and click "Get started."
    *   Choose to sign up with GitHub for easy integration.

2.  **Authorize Render:**

    *   Render will ask you to authorize access to your GitHub account. Grant the necessary permissions.

3.  **Create a New Web Service:**

    *   Click the "New +" button and select "Web Service".

4.  **Connect Your Repository:**

    *   Choose your Globetrotter GitHub repository from the list.

5.  **Configure the Web Service:**

    *   **Name:** Give your web service a name (e.g., `globetrotter-backend`).
    *   **Environment:** Choose "Node" as the environment.
    *   **Region:** Choose a region that's geographically close to your users.
    *   **Branch:** Select `main` (or whatever branch you're using for your production code).
    *   **Build command:** Enter `npm install`
    *   **Start command:** Enter `node server.js`
    *   **Instance Type:** Choose "Free" (or a paid plan if you need more resources).
    *   **Add Environment Variables:** This is crucial! Add the following environment variables:
        *   `GOOGLE_API_KEY`: Set the value to your Google AI Studio API key.
        *   `MONGODB_URI`: Set the value to your MongoDB Atlas connection string.
    *   Click "Create Web Service".

6.  **Wait for Deployment:**

    *   Render will automatically build and deploy your backend. You'll see a progress indicator. This process can take a few minutes.
    *   Once the deployment is complete, Render will provide you with a unique URL for your backend (e.g., `https://your-backend-name.onrender.com`).

7.  **Verify Deployment:**

    *   After deployment, view the logs in the Render dashboard to check if your backend connected to the MongoDB server.
    *   Go to a new API endpoint to verify if the backend is working.

### Part 3: Connecting the Frontend to the Backend

1.  **Update `frontend/script.js`:**

    *   Open your `frontend/script.js` file.
    *   Find the line where you're making requests to your backend:

        ```javascript
        fetch('http://localhost:3000/api/destination') // Replace with your backend URL if different
        ```

    *   Replace `http://localhost:3000` with the URL of your deployed Render backend (e.g., `https://your-backend-name.onrender.com`). Make sure to update all the URLs where you're fetching from the backend.

2.  **Commit and Push the Changes:**

    ```bash
    git add frontend/script.js
    git commit -m "Update backend URL in frontend"
    git push origin main
    ```

3.  **Wait for Netlify to Deploy:**

    *   Netlify will automatically detect the changes in your GitHub repository and deploy the updated frontend.

4.  **Test Your Application:**

    *   Visit your deployed Netlify frontend URL (e.g., `https://your-site-name.netlify.app`).
    *   Play the game to make sure everything is working correctly.


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