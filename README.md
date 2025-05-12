# Portrait TensorFlow.js Q&A PWA

This is a Progressive Web App (PWA) designed to work exclusively in portrait mode. It integrates a TensorFlow.js Question and Answering (Q&A) model ([`@tensorflow-models/qna`](https://github.com/tensorflow/tfjs-models/tree/master/qna)).

## Features

-   **Portrait Mode Lock**: The app displays a splash screen prompting the user to rotate to portrait mode if they are in landscape. The main content is only visible in portrait.
-   **TensorFlow.js Q&A**: Users can input a passage of text (context) and a question. The app uses a pre-trained Q&A model to find and display the answer from the provided passage.
-   **Dark Mode Toggle**: A button allows users to switch between light and dark themes. The preference is saved in `localStorage`.
-   **PWA Capabilities**: Includes a manifest file and a service worker (using Workbox) for basic offline capabilities (caching app shell) and "Add to Home Screen" functionality.
-   **Responsive UI**: Basic responsive styling for mobile devices.

## How it Works

1.  **Orientation Check**: On load and on orientation change, JavaScript checks if the device is in portrait mode.
2.  **Content Display**:
    *   If in portrait, the main application content (including the Q&A interface) is shown. The TensorFlow.js Q&A model is loaded asynchronously.
    *   If in landscape, a splash screen is shown instructing the user to switch to portrait.
3.  **Q&A Interaction**:
    *   The user provides a passage and a question in the respective input fields.
    *   Clicking "Ask Question" triggers the `findAnswers` function.
    *   This function passes the question and passage to the loaded `qna` model.
    *   The model returns potential answers with confidence scores. The top answer is displayed.
    *   Loading indicators inform the user about the model loading status and when answers are being processed.

## Setup

1.  Ensure you have an `icons` folder with `icon-192x192.png` and `icon-512x512.png`.
2.  Serve the files from a web server (HTTPS is required for service workers and "Add to Home Screen" on many browsers). GitHub Pages is a good option.
3.  Access `index.html` in a PWA-compatible browser (e.g., Chrome or Safari on mobile).

## Files

-   `index.html`: The main HTML file containing the structure, styles, and JavaScript logic for the app and the Q&A functionality.
-   `manifest.json`: The web app manifest file for PWA properties.
-   `sw-workbox.js`: The service worker script using Workbox for precaching assets.
-   `README.md`: This file.
