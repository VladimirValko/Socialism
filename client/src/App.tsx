import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import UserPage from "./pages/userPage/UserPage";
import People from "./pages/people/People";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:userId" element={<UserPage />} />
          <Route path="/users" element={<People />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
