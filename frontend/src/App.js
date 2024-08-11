import "./App.css";
import DetailsForm from "./components/DetailsForm";
import UserDetails from "./components/UserDetails";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<DetailsForm type="register" />} />
      <Route exact path="/userDetails" element={<UserDetails />} />
    </Routes>
  );
}

export default App;
