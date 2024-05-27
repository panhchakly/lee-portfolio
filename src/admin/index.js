import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
function Admin() {
  return (
      <Routes>
          <Route index element={<Layout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
  );
}

export default Admin;