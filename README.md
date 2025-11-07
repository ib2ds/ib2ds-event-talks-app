# Tech Talk Event Schedule Application

This project is a simple, single-page web application designed to display the schedule for a one-day technical talk event. It features dynamic schedule generation, real-time filtering of talks by category, and a clean, user-friendly interface.

## Features

*   **Dynamic Schedule Display:** Automatically generates the event schedule, including talk timings, speaker details, and descriptions.
*   **Automatic Time Calculation:** Handles 1-hour talk durations, 10-minute transitions between talks, and a 1-hour lunch break.
*   **Category and Speaker Search:** Allows users to filter talks instantly by typing keywords into a search bar for either category or speaker name.
*   **Responsive Design:** Basic styling for readability on various devices.
*   **Node.js Backend:** Serves static files and provides talk data via a simple API.

## Technologies Used

*   **Backend:**
    *   Node.js
    *   Express.js
*   **Frontend:**
    *   HTML5
    *   CSS3
    *   JavaScript (ES6+)

## Setup and Installation

Follow these steps to get the project up and running on your local machine.

1.  **Clone the repository (or ensure you are in the project directory):**
    If you haven't already, navigate to the project directory where you created these files.

    ```bash
    cd /Users/raviperumalsamy/gemini-cli-projects/tech-talk-website
    ```

2.  **Install Dependencies:**
    Install the necessary Node.js packages (Express.js).

    ```bash
    npm install
    ```

3.  **Start the Server:**
    Launch the Node.js server.

    ```bash
    npm start
    ```
    You should see a message in your terminal like: `Server running on http://localhost:3000`

4.  **Access the Application:**
    Open your web browser and navigate to `http://localhost:3000`.

## Project Structure

```
tech-talk-website/
├── data/
│   └── talks.json        # Stores the talk details in JSON format
├── public/
│   ├── css/
│   │   └── style.css     # Stylesheets for the frontend
│   ├── js/
│   │   └── script.js     # Frontend JavaScript logic (fetch, render, search)
│   └── index.html        # Main HTML file for the application
├── server.js             # Node.js Express server setup
├── package.json          # Project metadata and dependencies
└── .gitignore            # Specifies intentionally untracked files to ignore
```

## Customizing Talk Data

The talk schedule is defined in `data/talks.json`. You can edit this file to update the talks, speakers, categories, and descriptions. The frontend will automatically reflect these changes upon server restart (or refresh if the server is already running).

## How it Works (Briefly)

*   The **Node.js Express server** serves the static HTML, CSS, and JavaScript files from the `public/` directory.
*   It also provides a `/api/talks` endpoint that reads `talks.json` and sends the talk data to the frontend.
*   The frontend JavaScript (`script.js`) fetches this data, calculates the precise timings for each talk and breaks, renders the schedule dynamically, and handles the real-time category and speaker search functionality.

## License

This project is open-source and available under the ISC License.
