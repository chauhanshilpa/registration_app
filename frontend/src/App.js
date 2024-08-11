import { useState } from "react";
import "./App.css";
import DetailsForm from "./components/DetailsForm";
import UserDetails from "./components/UserDetails";
import { Routes, Route } from "react-router-dom";

/**
 *
 * @returns details form if path is "/" and user details if path is "/userDetails"
 */
function App() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Other");
  const [about, setAbout] = useState("");

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <DetailsForm
            type="register"
            userId={userId}
            name={name}
            age={age}
            dateOfBirth={dateOfBirth}
            password={password}
            gender={gender}
            about={about}
            setName={setName}
            setAge={setAge}
            setDateOfBirth={setDateOfBirth}
            setPassword={setPassword}
            setGender={setGender}
            setUserId={setUserId}
            setAbout={setAbout}
          />
        }
      />
      <Route exact path="/userDetails" element={<UserDetails />} />
    </Routes>
  );
}

export default App;
