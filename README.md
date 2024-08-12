# Registration App

## Introduction

This project is a full-stack user registration system with a ReactJS based front-end,
ExpressJS based back-end and MongoDB. It includes a user registration form showcasing CRUD operations.

<p float="center"><img width=49% height=250rem alt="registration_form" src="https://github.com/user-attachments/assets/0d87a32f-4d83-471e-a69a-130f346f98db"> <img width=49% height= 250rem alt="details_page" src="https://github.com/user-attachments/assets/43d19243-0f80-4fb5-828a-44870b73f0fe"></p>

## Features

- User registration form with validation.
- CRUD operations for user.
- Responsive design using React and Tailwind CSS.
- MongoDB database for data storage.
- Docker containerization for easy deployment.

## Technologies Used

Frontend

- React.js
- Tailwind CSS
- Axios for API calls

Backend

- Node.js
- Express.js as API framework

Database

- MongoDB as NoSQL database

Other

- Docker for containerization
- Docker Compose for easy testing

## Project Structure

### Frontend

- `src/`
  - `components/`
    - `DetailsForm.js`: Reusable form component for user registration and updates.
    - `UserDetails.js`: Component to display user details.
    - `Modal.js`: Reusable modal component for displaying messages.
  - `App.js`: Main application component.
  - `api.js`: Contains functions for API calls.

### Backend

- `index.js`: Main server file with API endpoints.
- `db.js`: Database connection setup.

## Setup and Installation

### Prerequisites

- Docker and Docker Compose installed (for containerized setup)

### Docker Setup

1. Navigate to the project root directory
2. run command `docker compose build` and then, `docker compose up`.
3. Wait for few minutes open `localhost:3002` in your browser.

## API Documentation

### Endpoints

NOTE: `userId` below is a backend generated internally used `UUID` string.

1. **Add new user**

   - Method: POST
   - Path: `/user`
   - Body: `{ name, age, dateOfBirth, password, gender, about}`

2. **Get user details**

   - Method: GET
   - Path: `/user`
   - params: `{userId}`

3. **Update user details**

   - Method: PATCH
   - Path: `/user`
   - body: `{ userId, name, age, dateOfBirth, password, gender, about }`

4. **Delete user**
   - Method: DELETE
   - Path: `/user`
   - params: `{userId}`