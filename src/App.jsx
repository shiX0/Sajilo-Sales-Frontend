import "./App.css";
import DarkModeToggle from "./components/darkmodetoggle";
import Login from "./pages/login/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// src/fontawesome.js
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import Register from "./pages/register/register";

library.add(faSun, faMoon);

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
