# ai-email-reply-generator-backend
# ai-email-reply-generator-frontend


# AI Email Reply Generator

AI Email Reply Generator is a full-stack web application designed to help users generate smart, professional, and context-aware email replies using Artificial Intelligence. The application simplifies email communication by allowing users to enter an existing email, choose their preferred response tone, and instantly generate a suitable reply.

The project is built using **React.js for the frontend** and **Java Spring Boot for the backend**, with integration of the **Google Gemini API** to generate AI-powered email responses.

## Key Features

- **AI-Powered Email Generation:** Automatically generates relevant email replies based on the provided email content.
- **Multiple Response Tones:** Supports six different tones:
  - Professional
  - Friendly
  - Polite
  - Casual
  - Formal
  - Apologetic
- **User-Friendly Interface:** Clean and simple interface for entering email content and generating responses.
- **Backend API Integration:** Connects the React frontend with the Spring Boot backend using REST APIs.
- **Dynamic AI Responses:** Generates context-aware replies based on the original email and selected tone.
- **Fast Communication:** Helps users save time and improve their email writing experience.

## Technology Stack

**Frontend:**
- React.js
- JavaScript
- HTML5
- CSS3
- Axios
- Vite

**Backend:**
- Java
- Spring Boot
- Spring WebFlux
- WebClient
- REST APIs
- Google Gemini API

## How It Works

1. The user enters the original email content in the application.
2. The user selects a preferred response tone.
3. The React frontend sends the email content and selected tone to the Spring Boot backend using Axios.
4. The backend processes the request and communicates with the Google Gemini API.
5. Gemini generates an appropriate email reply based on the given content and tone.
6. The generated response is returned to the frontend and displayed to the user.

## Project Structure

The repository contains both frontend and backend code in a single project folder, making development and maintenance easier.

## Project Objective

The main objective of this project is to explore practical AI integration in full-stack web development while building a useful application that improves productivity and makes professional email communication easier.

This project demonstrates practical knowledge of React.js, Java, Spring Boot, REST API development, asynchronous API communication, and third-party AI integration.
