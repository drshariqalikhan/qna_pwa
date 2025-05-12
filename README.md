# Portrait TensorFlow.js Q&A PWA with Wikipedia Integration

This is a Progressive Web App (PWA) designed to work exclusively in portrait mode. It integrates a TensorFlow.js Question and Answering (Q&A) model ([`@tensorflow-models/qna`](https://github.com/tensorflow/tfjs-models/tree/master/qna)) and allows users to fetch context directly from Wikipedia.

## Features

-   **Portrait Mode Lock**: The app displays a splash screen prompting the user to rotate to portrait mode if they are in landscape. The main content is only visible in portrait.
-   **Wikipedia Search**: Users can enter a search term. The app queries the Wikipedia API, fetches the introductory text of the top article result, and populates it as context.
-   **TensorFlow.js Q&A**: Users can then ask a question related to the fetched Wikipedia passage. The app uses a pre-trained Q&A model to find and display the answer(s).
-   **Dark Mode Toggle**: A button allows users to switch between light and dark themes. The preference is saved in `localStorage`.
-   **PWA Capabilities**: Includes a manifest file and a service worker (using Workbox) for basic offline capabilities (caching app shell) and "Add to Home Screen" functionality.
-   **Responsive UI**: Basic responsive styling for mobile devices.

## How it Works

1.  **Orientation Check**: On load and on orientation change, JavaScript checks if the device is in portrait mode.
2.  **Content Display**:
    *   If in portrait, the main application content is shown. The TensorFlow.js Q&A model is loaded asynchronously.
    *   If in landscape, a splash screen is shown.
3.  **Wikipedia Context Fetching**:
    *   The user enters a search term in the "Wikipedia Search Term" field and clicks "Search Wikipedia".
    *   The app calls the Wikipedia API to find matching articles.
    *   It takes the title of the top search result and fetches its introductory plain text extract.
    *   This extract is automatically loaded into the "Passage (Context from Wikipedia)" textarea.
    *   Status messages inform the user about the search and fetch process.
4.  **Q&A Interaction**:
    *   The user enters a question in the "Question about the Passage" field.
    *   Clicking "Ask Question" triggers the `findAnswers` function.
    *   This function passes the question and the Wikipedia-sourced passage to the loaded `qna` model.
    *   The model returns potential answers with confidence scores. The top answer(s) are displayed.
    *   Loading indicators inform the user about model loading and answer processing.

## Setup

1.  Ensure you have an `icons` folder with `icon-192x192.png` and `icon-512x512.png`.
2.  Serve the files from a web server (HTTPS is required for service workers and "Add to Home Screen" on many browsers). GitHub Pages is a good option.
3.  Access `index.html` in a PWA-compatible browser (e.g., Chrome or Safari on mobile).

## Files

-   `index.html`: The main HTML file containing the structure, styles, and JavaScript logic.
-   `manifest.json`: The web app manifest file.
-   `sw-workbox.js`: The service worker script.
-   `README.md`: This file.
