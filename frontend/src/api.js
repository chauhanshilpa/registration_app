import axios from "axios";
class NewUser {
  constructor(name, age, dateOfBirth, password, gender, about) {
    this.name = name;
    this.age = age;
    this.dateOfBirth = dateOfBirth;
    this.password = password;
    this.gender = gender;
    this.about = about;
  }
}

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

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

export async function getUserDetails(userId) {
  const response = await axios.get(`${BASE_URL}/user`, {
    params: {
      userId,
    },
  });
  return response.data;
}

export async function loginDetails() {
  // get call
}

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

export async function deleteUserData(userId) {
  await axios.delete(`${BASE_URL}/user`, {
    params: {
      userId,
    },
  });
  return;
}

export async function getGenderDetails() {
  // get call
}
