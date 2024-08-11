# Registration App

## Introduction

This project is a full-stack user registration system with both front-end and back-end components. It includes a user registration form, CRUD operations, and appropriate database design.

<p float="center"><img width=33% height=250rem alt="registration_form" src="https://github.com/user-attachments/assets/0d87a32f-4d83-471e-a69a-130f346f98db"> <img width=33% height= 250rem alt="details_page" src="https://github.com/user-attachments/assets/43d19243-0f80-4fb5-828a-44870b73f0fe"> <img width=33% height= 250rem alt="update_form" src="https://github.com/user-attachments/assets/adec3f0d-8e08-4194-bd35-6423d9596fdc"></p>

## Features

- User registration form with validation
- CRUD operations for user data
- Responsive design using React and Tailwind CSS
- MongoDB database for data storage
- Docker containerization for easy deployment

## Technologies Used

### Frontend

- React.js
- Tailwind CSS
- Axios for API calls

### Backend

- Node.js with Express
- MongoDB for database

### Other

- Docker for containerization

## Project Structure

### Frontend

- `src/`
  - `components/`
    - `DetailsForm.js`: Reusable form component for user registration and updates
    - `UserDetails.js`: Component to display user details
    - `Modal.js`: Reusable modal component for displaying messages
  - `App.js`: Main application component
  - `api.js`: Contains functions for API calls

### Backend

- `index.js`: Main server file with API endpoints
- `db.js`: Database connection setup

## Setup and Installation

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running
- Docker and Docker Compose installed (for containerized setup)

### Local Setup

1. **Clone the repository**

2. **Frontend setup:**

   ```bash
   cd frontend
   npm install

   ```

3. **Backend setup:**

   ```bash
   cd backend
   npm install

   ```

4. **Set up environment variables**
5. **Start the backend server**
6. **Start the frontend development server**

### Docker Setup

1. Navigate to the project root directory
2. run command `docker compose build` and then, `docker compose up`.
3. Wait for few minutes and go to frontend defined port in docker-compose.yml file i.e. `localhost:3002` and app is ready to use.

## API Documentation

### Endpoints:

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

## User Instructions

### Registration Process

1. Navigate to the registration form.
2. Fill in the required fields:
   - Name
   - Age
   - Date of Birth
   - Password
   - About
3. Select your gender (optional):
   - If no gender is selected, it will default to "Other"
4. Click the "Register" button to submit your information.

### Viewing User Details

After successful registration, you will be redirected to a page displaying your user details.

### Editing User Information

1. On the user details page, locate the edit icon.
2. Click the edit icon to open the update form.
3. Modify the desired fields.
4. Submit the form to save your changes.

### Deleting User Account

1. On the user details page, find the delete icon.
2. Click the delete icon.
3. Confirm the deletion when prompted.
4. Your account will be removed from the database.
5. You will be automatically redirected to the registration form.
