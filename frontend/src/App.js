import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
import UserDetails from "./components/UserDetails";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<RegistrationForm />} />
        <Route exact path="/userDetails" element={<UserDetails />} />
      </Routes>
    </>
  );
}

export default App;
