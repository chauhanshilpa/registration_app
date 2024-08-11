import "./App.css";
import DetailsForm from "./components/DetailsForm";
import UserDetails from "./components/UserDetails";
import { Routes, Route } from "react-router-dom";

/**
 * 
 * @returns details form if path is "/" and user details if path is "/userDetails"
 */
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<DetailsForm type="register" />} />
      <Route exact path="/userDetails" element={<UserDetails />} />
    </Routes>
  );
}

export default App;
