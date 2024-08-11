import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const GENDERS = ["Other", "Male", "Female"]

// add new user
export async function addNewUser(
  name,
  age,
  dateOfBirth,
  password,
  gender,
  about
) {
  const response = await axios.post(`${BASE_URL}/user`, {
    name,
    age,
    dateOfBirth,
    password,
    gender,
    about,
  });
  return response;
}

// get user details
export async function getUserDetails(userId) {
  const response = await axios.get(`${BASE_URL}/user`, {
    params: {
      userId,
    },
  });
  return response.data;
}

// update user details
export async function updateUserData(
  userId,
  name,
  age,
  dateOfBirth,
  password,
  gender,
  about
) {
  await axios.patch(`${BASE_URL}/user`, {
    userId,
    name,
    age,
    dateOfBirth,
    password,
    gender,
    about,
  });
  return;
}

// delete user details
export async function deleteUserData(userId) {
  await axios.delete(`${BASE_URL}/user`, {
    params: {
      userId,
    },
  });
  return;
}

export async function getGenders(){
  return [...GENDERS];
}

