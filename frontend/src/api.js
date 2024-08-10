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
  await axios.post(`${BASE_URL}/user`, {
    name,
    age,
    dateOfBirth,
    password,
    gender,
    about,
  });
}

export async function getUserDetails(name) {
  const response = await axios.get(`${BASE_URL}/user`, {
    params: {
      name,
    },
  });
  console.log(response.data);
}

export async function loginDetails() {
  // get call
}

export async function updateUserData() {
  // put call
}

export async function deleteUserData() {
  // delete call
}

export async function getGenderDetails() {
  // get call
}
